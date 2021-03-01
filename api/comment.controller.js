const db = require('../models');
const Comment = db.Comment;
const jwt = require('jsonwebtoken');
const config = require('../config/secret')

exports.createComment = (req, res) => {
  if (!req.body.content || !req.body.postId) {
    return res.json({
      success: false,
      message: "Invalid params"
    })
  }
  var token = req.headers['token']
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) return res.status(200).send({ success: false, message: 'Failed to authenticate token' });
    Comment.create({
      postId: req.body.postId,
      content: req.body.content,
      userId: decoded.id
    }).then(function (users) {
      if (users) {
        return res.json({
          success: true,
          message: "Successfully Created"
        })
      } else {
        return res.json({
          success: false,
          message: "Failed creating post"
        })
      }
    }).catch(function (err) {
      if (err) {
        return res.json({
          success: false,
          message: "Something went wrong",
        })
      }
    });
  });
}