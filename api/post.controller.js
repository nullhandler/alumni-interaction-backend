const db = require('../models');
const Post = db.Post;
const Comment = db.Comment;
const jwt = require('jsonwebtoken');
const config = require('../config/secret')

exports.createPost = (req, res) => {
  if (!req.body.title || !req.body.category || !req.body.content) {
    return res.json({
      success: false,
      message: "Invalid params"
    })
  }
  var token = req.headers['token']
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) return res.status(200).send({ success: false, message: 'Failed to authenticate token' });
    Post.create({
      title: req.body.title,
      category: req.body.category,
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

exports.getPosts = (req, res) => {
  var token = req.headers['token']
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) return res.status(200).send({ success: false, message: 'Failed to authenticate token' });
    Post.findAll({ attributes: ['title', 'category', 'id'], include: [{ model: db.User, as: 'author', attributes: ['name', 'photo'] }] }).then((posts) => {
      return res.json({
        success: true,
        posts: posts
      })
    }).catch(function (err) {
      console.log(err)
      if (err) {
        return res.json({
          success: false,
          message: "Something went wrong",
        })
      }
    })
  })
}

exports.getPostDetail = (req, res) => {
  if(!req.query.postId){
    return res.json({
      success: false,
      message: "Invalid params"
    })
  }
  var token = req.headers['token']
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) return res.status(200).send({ success: false, message: 'Failed to authenticate token' });
    Post.findOne({where: {id: req.query.postId}, include: [{model: db.User, as: 'author', attributes: ['name', 'photo']}, {model: db.Comment, as: 'comments', include: {model: db.User, as: 'author', attributes: ['name', 'photo']}}]}).then((post) => {
      if(!post){
        return res.json({
          success: false,
          message: "Cant find the post"
        })
      }
      return res.json({
        success: true,
        post: post
      })
    }).catch(function (err) {
      if (err) {
        return res.json({
          success: false,
          message: "Something went wrong",
        })
      }
    })
  })
}

exports.getUser = (req, res)=>{
  if(!req.body.userId){
    return res.json({
      success: false,
      message: "Invalid params"
    })
  }
  var token = req.headers['token']
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) return res.status(200).send({ success: false, message: 'Failed to authenticate token' });
    db.User.findOne({id: req.body.userId, attributes: {exclude: ['password']}}).then(function (user){
      return res.json({
        success: true,
        user: user
      })
    }).catch(function (err){
      return res.json({
        success: false,
        message: "Cant find user"
      })
    })
  })
}