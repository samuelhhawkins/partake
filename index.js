
require('dotenv').config()

// require needed modules
let express = require('express')
let layouts = require('express-ejs-layouts')
let flash = require('connect-flash')
let session = require('express-session')
var cloudinary = require('cloudinary').v2;
let db = require('./models')
let methodOverride = require('method-override')
//create an app instance
let app = express()

//include the passport (via the passport config file)
let passport = require('./config/passportConfig')
//******************SETTINGS and middleware

//set template lang to ejs
app.set('view engine', 'ejs')

//tell express to use layoutes modules
app.use(layouts)
app.use(express.static('static'))

//decript the vars coming in from post routes/ forms
app.use(express.urlencoded({extended: false}))
app.use(express.json())
//set up sessions
app.use(session ({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

//set up connect flash for the flash alert messages (depends on session order matters!!)
app.use(flash())
app.use(methodOverride('_method'));


// set up passport (depends on session; must come after it)
app.use(passport.initialize())
app.use(passport.session())

//use locals to write some custom middle ware so that flash can be used everyewhere
//custom middleware - make certain variables available to ejs pages through locals
app.use((req, res, next) => {
  res.locals.alerts = req.flash()
  res.locals.user = req.user
  next()
})

//******************ROUTES
//controllers
app.use('/profile', require('./controllers/profile'))
app.use('/auth', require('./controllers/auth'))
app.use('/post', require('./controllers/post'))


//route to render home

//route to render all posts on home page
app.get('/', function(req, res) {
  db.posts.findAll({
    include: [db.pics, db.tags],
    order: [['createdAt', 'DESC']]
  }).then(function(posts) {
    res.render('home', {posts})
  })
  .catch(err => {
      console.log(err)
      res.render('error')
    })
  })


//create wild card rought (catch-all) this goes LAST!!!!!!!!
app.get('*', (req, res) => {
  res.render('error')
})


//******************Listen

//pick a port
app.listen(process.env.PORT || 3000)
