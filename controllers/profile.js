let router = require('express').Router()
let moment = require('moment')
let adminLogin = require('../middleware/adminLogin')
let userLogin = require('../middleware/userLogin')
let db = require('../models')
var async = require('async')

//Custome middleware that is only applied to the routes in this profile
router.use(userLogin)



//get /profile/user - a normal profile for the plebs
//NOTE: Protect this route from users who are not logged in
router.get('/user', (req, res) => {
  db.user.findOne({
    where: {id: req.user.id},
    include: [{
      model: db.posts,
      include: [db.pics]
    }]
  })
  .then(userProfile => {
    res.render('profile/user', { moment, userProfile })
  })

})


router.get('/guest/:id', (req, res) => {
  db.user.findByPk(req.params.id)
  .then(userProfile => {
    res.render('profile/guest', { moment, userProfile })
  })
  .catch(err => {
    console.log(err)
    res.render('error')
  })
})

//GET /profile/admin - a special profile admins
//NOTE: Protect this route from users who are not logged in and non admins
router.get('/admin', adminLogin, (req, res) => {
  db.user.findAll()
  .then(users => {
    res.render('profile/admin', { moment, users} )
  })
  .catch(err => {
    console.log(err)
    res.render('error')
  })
})


module.exports = router
