const controller = require('./auth.controller')
module.exports = (app)=>{
  app.post('/register', controller.register)
  app.post('/login', controller.login)
}