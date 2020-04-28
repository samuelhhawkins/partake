let router = require('express').Router()
let moment = require('moment')
let adminLogin = require('../middleware/adminLogin')
let userLogin = require('../middleware/userLogin')
let db = require('../models')
var async = require('async')


//get route for finding new post page
router.get('/new', function(req, res) {
  db.user.findAll()
  .then(function(users) {
    res.render('post/new', { user: user })
  })
  .catch(function(error) {
    res.status(400).render('main/404')
  })
})


//POST route for posting form make sure it sends to browse and profile
router.post('/post/new', function(req, res) {
  let tags = []
  if (req.body.tags) {
  tags = req.body.tags.split(',')
  }
  db.post.create({
    title: req.body.title,
    caption: req.body.caption,
    wants: req.body.wants
  })
  .then(function(post) {
    if (tags.length){
      //TO do create the tags + associations
      // async.forEach(array, normal forEach function, function to run at the end)
      async.forEach(tags, (t, done) => {
        //this function gets callled for every function in the tags array
        db.tag.findOrCreate({
          where: { tag: t.trim() }
        })
        .then(([tag, wasCreated]) => {
          // tag was found or created successfully, now we need to add the join table
          // <model1>.add<model2>(model2 instance)
          post.addTag(tag)
          .then(() => {
            //all done adding tag and relation in join tbale, call done to indicate
            // tgat we are done with this iteration of the forEach
            done()
          })
        })
      }, () => {
        //this runs when everything is resolved safely move on to next page
        res.redirect('/profile/user' + post.id)
      })
    }
    else {
        //no tags to be created just redirect as normal
      res.redirect('/profile/user' + post.id)
    }
  })
  .catch(function(error) {
    console.log('error', error)
    res.status(400).render('/error')
  })
})

router.get('/:id', function(req, res) {
  db.posts.findOne({
    where: { id: req.params.id },
    include: [db.user, db.pics, db.tags]
  })
  .then(function(post) {
    if (!post) throw Error()
    console.log(posts.user)
    res.render('/', { posts: posts })
  })
  .catch(function(error) {
    console.log(error)
    res.status(400).render('/error')
  })
})
//add item and all of images to db
// redirect to profile

module.exports = router
