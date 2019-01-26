const cookieController = {};
const User = require('../models/UserModel');

cookieController.setCookie = (req, res, next) => {
  res.cookie('cookie', res.locals.id, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24})
  next();
}

cookieController.hasCookie = (req, res, next) => {
  User.findOne({_id: req.cookies.cookie})
    .then((result) => {
      if (result === null) res.redirect('/sign-up')
      next();
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/sign-in');
    })
}

module.exports = cookieController;