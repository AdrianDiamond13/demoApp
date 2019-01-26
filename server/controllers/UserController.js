/**
 * Need the following methods
 * 1. getUser
 * 2. setUser
 * 3. updateUser
 * 4. deleteUser
 */
const User = require('../models/UserModel');

const userController = {};

userController.getUser = (req, res, next) => {
  User.findOne({ username: req.body.username, password: req.body.password })
    .then(result => {
      res.locals.user = result;
      res.locals.id = result._id;
      next();
    });
};

userController.createUser = (req, res, next) => {
  User.create(req.body)
    .then(result => {
      res.locals.user = result;
      res.locals.id = result._id;
      next();
    });
};

userController.updateUser = (req, res, next) => {
  User.findOneAndUpdate({ username: req.params.name }, { $set: req.body }, { new: true })
    .then(result => {
        res.locals.user = result;
        next();
    });
};

userController.deleteUser = (req, res, next) => {
  User.findOneAndDelete({ username: req.params.name })
    .then(result => {
      res.locals.user = result;
      next();
    });
};

module.exports = userController;
