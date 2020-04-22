// node modules/variables
let router = require('express').Router()
let db = require('../models')
//routes
router.get('/login', (req, res) => {
  res.render('auth/login.ejs')
})

//POST /auth/login this is the place for the login form
router.post('/login', (req, res) => {
  res.send('hello from the post route')
  console.log('DATA', req.body)
})

// get /auth/signup this is the page that renders signup
router.get('/signup', (req, res) => {
  res.render('auth/signup', { data: {} })
})

router.post('/signup', (req, res) => {
    console.log('REQUEST BODY', req.body)
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
        // TODO!!!!!: AUTO-LOGIN
        res.send('It WORKED')
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
// export (allows me to include this in another page)
module.exports = router
