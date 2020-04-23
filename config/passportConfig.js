// require env variables//
//////////////////////////
require('dotenv').config()

//require any needed node modules
let passport = require('passport')


//reqUIRE  any strategies(aka types of auth) we want to use
let LocalStrategy = require('passport-local').Strategy

//Import a referance to our database
let db = require('../models')

//serialization and deserialization functions
// these are for passport to use in order to store and lookup the user info
//SERIALIZE: reduce a user object to just its id field
passport.serializeUser((user, done) => {
  // call the callback function with the user id as an argument
  // done(error, id) - pass a null if no error
  done(null, user.id)
})

// deserialize: reverse the process of serialization
// in oter words tak a users id and return the full user object
passport.deserializeUser((id, done) => {
  db.user.findByPk(id)
  .then(user => {
    done(null, user)
  })
  .catch(done)
})

//Local Strategy: using a database that we manage ourselves
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  //^ username req password req and closing function
  //Try looking up the user by their email
  db.user.findOne({
    where: {email: email}
  })
  .then(foundUser => {
    // Check if user foound; also if yes check password too
    if (foundUser && foundUser.validPassword(password)) {
      //GOOD --- user existing and password is correct
      done(null, foundUser)
    }
    else {
      // BAD -- user doesnt exist or p word is bad
      done(null, null)
    }
  })
  .catch(done)
}))



module.exports = passport
//think about canvas crawler how the ogre and crawler had the same inputs but different values
//js classes differ vastly from html css classes
// its kinda like a layout or boiler plate but you dont use it use it for everything but similar functions or objects
