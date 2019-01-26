require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const toDoController = require('./controllers/toDoController');
const userController = require('./controllers/UserController');
const cookieController = require('./controllers/cookieController');

const app = express();
const PORT = 3000;

// Mongoose connection
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true },
  err => {
    if (err) throw new Error(err);
  }
);
mongoose.connection.once('open', () => {
  console.log('DB Connection Established');
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * ====================================================
 * Routes to send specifc HTML files
 * ====================================================
 */

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.status(200).sendFile(__dirname + '/views/sign-in.html');
})

app.get('/sign-up', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.status(200).sendFile(__dirname + '/views/sign-up.html');
})

app.get('/todos', cookieController.hasCookie, (req, res) => {
  res.set('Content-Type', 'text/html')
  res.status(200).sendFile(__dirname + '/views/index.html');
})

app.get('/style.css', (req, res) => {
  res.set("Content-Type", 'text/css')
  res.status(200).sendFile(__dirname + '/views/style.css');
})

app.get('/script.js', (req, res) => {
  res.set("Content-Type", 'text/javascript')
  res.status(200).sendFile(__dirname + '/views/script.js');
})

/**
 * ====================================================
 * CREATE ROUTES FOR THE SIGN UP AND SIGN IN POST FORMS
 * ====================================================
 */

app.post('/sign-in', userController.getUser, cookieController.setCookie, (req, res) => {
  // res.status(200).json(res.locals.user);
  res.redirect('/todos');
})

app.post('/sign-up', userController.createUser, cookieController.setCookie, (req, res) => {
  // res.status(200).json(res.locals.user);
  res.redirect('/todos');
})

/**
 * =================================================
 * ROUTES FOR FETCH REQUESTS FROM OUR script.js file
 * =================================================
 */

//Get request route
app.get('/getTodos', toDoController.getTodos, (req,res)=>{
  // console.log(res.locals.todos);
  res.status(200).json(res.locals.todos)
})

//Post request route
app.post('/submit', toDoController.submit, (req, res) => {
  res.status(200).json(res.locals.newTodo)
});

//Post request route
app.delete('/remove', toDoController.removeTodo, (req, res) => {
  res.status(200).json(res.locals.removed)
});

/**
 * =================================================
 * =============== ERROR HANDLER! ==================
 * =================================================
 */

// ERROR HANDLER!
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Sorry, something went wrong!');
});

app.listen(PORT, () => console.log(`demo listening on port ${PORT}`));
