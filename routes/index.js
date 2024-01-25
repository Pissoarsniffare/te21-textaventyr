const express = require('express')
const router = express.Router()

const story = require('../data/story.json')

const pool = require('../db')

router.get('/dbtest', async function (req, res) {
  try {
    const [parts] = await pool.promise().query('SELECT * FROM samuel_part')
    const [options] = await pool.promise().query('SELECT * FROM samuel_part')
    res.json({ parts, options })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/', function (req, res) {
  console.log(story.parts[0])
  res.render('index.njk', { 
    username: req.session.username || "mupp",
    title: 'Welcome', 
    part: story.parts[0] })
})

router.post('/username', function (req, res) {
  req.session.username = req.body.username
  console.log(req.session.username)
  res.redirect('/')
})

router.get('/story/:id', function (req, res) {
  console.log(req.params.id)
  const part = story.parts.find((part) => part.id === parseInt(req.params.id))
  if (!part) {
    res.status(404).render('404.njk', { title: '404' })
    return
  }
  res.render('part.njk', { title: part.name, part: part })
})

module.exports = router
