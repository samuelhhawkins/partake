// node modules/variables
let router = require('express').Router()

//routes
router.get('/login', (req, res) => {
  res.render('auth/login.ejs')
})

//POST
router.post('/login', (req, res) => {
  res.send('hello from the post route')
  console.log('DATA', req.body)
})

router.get('/signup', (req, res) => {
  res.render('auth/signup.ejs')
})

// export (allows me to include this in another page)
module.exports = router
