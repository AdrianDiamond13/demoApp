const Task = require('../models/ToDoModel');
const toDo = {};

toDo.submit = async (req, res, next) => {
  const result = await Task.create({task: req.body.text});
  res.locals.newTodo = result;
  next();
};

toDo.getTodos = (req, res, next) => {
  Task.find({})
    .then(todos => {
      res.locals.todos = todos;
      next();
    })
    .catch(err => console.log(err))
};

toDo.removeTodo = async (req, res, next) => {
  const removed = await Task.findOneAndRemove({_id: req.body._id})
  res.locals.removed = removed;
  next();
};

module.exports = toDo;
