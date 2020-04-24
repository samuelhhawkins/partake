// node modules/variables
let router = require('express').Router()
let db = require('../models')
let passport = require('../config/passportConfig')
//routes
router.get('/login', (req, res) => {
  res.render('auth/login.ejs')
})

//POST /auth/login this is the place for the login form
router.post('/login', passport.authenticate('local', {
  successFlash: 'Succcessful Login - Welcome Back!',
  successRedirect: '/profile/user',
  failureFlash: 'Invalid Credentials',
  failureRedirect: '/auth/login'
}))

// get /auth/signup this is the page that renders signup
router.get('/signup', (req, res) => {
  res.render('auth/signup', { data: {} })
})

router.post('/signup', (req, res, next) => {
    if(req.body.password !== req.body.password_verify){
        // send a message about why it didnt work
        req.flash('error', 'passwords do not match')
        //put user back on signup form to try again
        res.render('auth/signup', {data: req.body, alerts: req.flash()})
}
else {
  //passwords matched , now well find or create but the user email
    db.user.findOrCreate({
      where: { email: req.body.email },
      defaults: req.body
    })
    .then(([user, wasCreated]) => {
      if(wasCreated) {
        // good -- this was expected proper new user they are
        // AUTO-LOGIN with passport
        passport.authenticate('local', {
          successFlash: 'Succcessful Login - Welcome Back!',
          successRedirect: '/profile/user',
          failureFlash: 'Invalid Credentials',
          failureRedirect: '/auth/login'
        })(req, res, next)
      }
      else{
        // bad ting mate this person already had an account (gotta redirct em to login )
        req.flash('error', 'Account already exists')
        res.redirect('/auth/login')
      }
    })
    .catch(err => {
      console.log('error creating a user', err)

      //check for sequelize validation errors and make flash messages for them
      if (err.errors) {
          err.errors.forEach(e => {
            if(e.type == 'Validation error'){
              req.flash('error', e.message)
            }
        })
      }
      else{
        //generic message for any other issue
        req.flash('error', 'server error')
      }

      //Redirect back to sign up
      res.redirect('/auth/signup')
    })
  }
})

router.get('/logout', (req, res) => {
  //remove usr data from session
  req.logout()
  // tell user goodbye and send to home page 
  req.flash('success', 'Bye for now!')
  res.redirect('/')
})

// export (allows me to include this in another page)
module.exports = router
