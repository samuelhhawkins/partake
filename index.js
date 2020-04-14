// require needed modules
let express = require('express')
let layouts = require('express-ejs-layouts')
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
