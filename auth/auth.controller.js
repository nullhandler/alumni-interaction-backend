const db = require('../models');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = db.User;
const config = require('../config/secret')

exports.register = function (req, res) {
  if (!req.body.phone || !req.body.password || !req.body.name || !req.body.photo || !req.body.desc) {
    return res.json({
      success: false,
      message: "Invalid params"
    })
  }
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create({
    name: req.body.name,
    phone: req.body.phone,
    desc: req.body.desc,
    photo: req.body.photo,
    password: hashedPassword
  }).then(function (users) {
    if (users) {
      var token = jwt.sign({ id: req.body.phone }, config.secret);
      return res.json({
        success: true,
        message: "Successfully Created",
        token: token
      })
    } else {
      return res.json({
        success: false,
        message: "Failed creating user"
      })
    }
  }).catch(function (err) {
    if (err) {
      return res.json({
        success: false,
        message: "User already exists",
      })
    }
  });
}

exports.login = function (req, res) {
  if (!req.body.phone || !req.body.password) {
    return res.json({
      success: false,
      message: "Invalid params"
    })
  }

  User.findOne({ where: { phone: req.body.phone } }).then(function (user) {
    if (!user) return res.status(404).send({ success: false, message: "User not registered" });
    var pwd = bcrypt.compareSync(req.body.password, user.password);
    if (pwd) {
      var token = jwt.sign({ id: req.body.phone }, config.secret);
      return res.status(200).send({ success: true, token: token });
    } else {
      return res.status(200).send({ success: false, message: "Password is incorrect" });
    }
  }).catch(function (err) {
    if (err) {
      return res.json({
        success: false,
        message: "Something went wrong",
      })
    }
  });
}

exports.upload = (req, res, next) =>{
  if (!req.file) {
    res.status(200);
    return res.json({success: false, message: 'An error occurred!'});
  }
  return res.json({ fileUrl: `http://localhost:8080/images/` + req.file.filename });
}