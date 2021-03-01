const controller = require('./post.controller')

module.exports = (app)=>{
  app.post('/createPost', controller.createPost)
  app.get('/getPosts', controller.getPosts)
  app.get('/getPostDetail', controller.getPostDetail)
  app.get('/getUser', controller.getUser)
}