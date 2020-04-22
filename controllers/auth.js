// node modules/variables
let router = require('express').Router()

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
  res.send('POST route reached - password good')
}
})
// export (allows me to include this in another page)
module.exports = router
