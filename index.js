// require needed modules
let express = require('express')
let layouts = require('express-ejs-layouts')
let flash = require('connect-flash')
let session = require('express-session')

//create an app instance
let app = express()

//******************SETTINGS and middleware

//set template lang to ejs
app.set('view engine', 'ejs')

//tell express to use layoutes modules
app.use(layouts)
app.use('/', express.static('static'))

//decript the vars coming in from post routes/ forms
app.use(express.urlencoded({extended: false}))

//set up sessions
app.use(session({
  secret: "any string is fine",
  resave: false,
  saveUnitialized: true
}))

//set up connect flash for the flash alert messages (depends on session order matters!!)
app.use(flash())

//use locals to write some custom middle ware so that flash can be used everyewhere
//custom middleware - make certain variables available to ejs pages through locals
app.use((req, res, next) => {
  res.locals.alerts = req.flash()
  next()
})

//******************ROUTES
//controllers
app.use('/auth', require('./controllers/auth'))

//route to render home
app.get('/', (req, res) => {
  res.render('home')
})
//create wild card rought (catch-all) this goes LAST!!!!!!!!
app.get('*', (req, res) => {
  res.render('error')
})


//******************Listen

//pick a port
app.listen(3000)
