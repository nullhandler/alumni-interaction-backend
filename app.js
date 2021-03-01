const express = require('express')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')

const db = require('./models');
const User = db.User;
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
db.sequelize.sync({ force: false })
app.use(bodyParser.json())

require('./auth/auth.routes')(app)
require('./api/post.routes')(app)
require('./api/comment.routes')(app)

module.exports = app