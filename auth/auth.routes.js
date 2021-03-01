const controller = require('./auth.controller')

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

module.exports = (app)=>{
  app.post('/register', controller.register)
  app.post('/login', controller.login)
  app.post('/upload', upload.single('file'), require('../auth/auth.controller').upload);
}