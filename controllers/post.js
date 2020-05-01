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
    res.render('post/new')
  })
  .catch(function(error) {
    res.status(400).render('error')
  })
})


router.get('/show/:id', function(req, res) {
  db.posts.findOne({
    where: {id: req.params.id},
    include: [db.pics, db.tags, db.user]
  })
  .then(function(posts) {
    res.render('post/show', {p: posts})
  })

})
//POST route for posting form make sure it sends to browse and profile
router.post('/new', function(req, res) {
  let tags = []
  console.log(req.body)
  if (req.body.tags) {
  tags = req.body.tags.split(',')
  }
  db.posts.create({
    title: req.body.title,
    caption: req.body.caption,
    wants: req.body.wants,
    userId : req.body.userId
  })
  .then(function(post) {
    db.pics.create({
      file: req.body.files
    })
    .then(function(pic) {
      post.addPic(pic)
    })
    .then(function() {
      if (tags.length){
        //TO do create the tags + associations
        // async.forEach(array, normal forEach function, function to run at the end)
        async.forEach(tags, (t, done) => {
          //this function gets callled for every function in the tags array
          db.tags.findOrCreate({
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
          res.redirect('/profile/user')
        })
      }
      else {
          //no tags to be created just redirect as normal
        res.redirect('/profile/user')
      }
    })

  })
  .catch(function(error) {
    console.log('error', error)
    res.status(400).render('error')
  })
})


router.get('/:id', function(req, res) {
  db.posts.findOne({
    where: { id: req.params.id },
    include: [db.user, db.pics, db.tags],
    order: [['createdAt', 'DESC']]
  })

  .then(function(posts) {
    if (!posts) throw Error()
    console.log(posts.user)
    res.render('post/edit', { posts: posts })
  })
  .catch(function(error) {
    console.log(error)
    res.status(400).render('error')
  })
})
//add item and all of images to db
// redirect to profile


router.put('/:id', (req, res) => {
    console.log('REQUEST BODY', req.body)
    db.posts.update(
        req.body,
        { where: { id: req.params.id } },

    )
    .then(() => {
        res.redirect('/profile/user')
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})


router.delete('/:id', (req, res) => {
  console.log('inside delete route')
  db.posts_pics.destroy({
    where: {postId: req.params.id}
  })
  .then(() => {
    console.log('inside post tags route')

    db.posts_tags.destroy({
      where: {postId: req.params.id}
    })
    .then(() => {
      console.log('inside post route')
      db.posts.destroy({
          where: { id: req.params.id }
      })
      .then(() => {
          res.redirect('/profile/user')
        })
      })
    })
    .catch(err => {
        console.log('Error in delete route', err)
        res.render('error')
    })
})



module.exports = router
