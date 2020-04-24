module.exports = (req, res, next) => {

  //do stuff
  if (req.user) {
    //GOOD they are logged in
    next() //proceed as planned
  }
  else{
    //BAD - they are not logged in
    // send an error message + send them to the login
    req.flash('error', 'You must be logged in to view that page')
    res.redirect('/auth/login')
  }
}
