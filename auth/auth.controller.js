const db = require('../models');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = db.User;
const config = require('../config/secret')
var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    var filetype = '';
    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});
var upload = multer({ storage: storage });
exports.register = function (req, res) {
  if (!req.body.phone || !req.body.password || !req.body.name) {
    return res.json({
      success: false,
      message: "Invalid params"
    })
  }
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create({
    name: req.body.name,
    phone: req.body.phone,
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

exports.upload = 