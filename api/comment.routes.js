const controller = require('./comment.controller')

module.exports = (app)=>{
  app.post('/createComment', controller.createComment)
}