// node modules/variables
let router = require('express').Router()

//routes
router.get('/login', (req, res) => {
  res.render('auth/login.ejs')
})

router.get('/signup', (req, res) => {
  res.send('STUB - sign up form')
})

// export (allows me to include this in another page)
module.exports = router
