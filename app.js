const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//////////
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define a route that renders the index.ejs file
app.get('/', (req, res) => {
  // Simulate data fetched from the backend (replace this with actual data retrieval)
  const cardData = {
    imgSrc: '/images/yourimage.jpg',
    cardTitle: 'Your Card Title',
    cardContent: 'Your card content goes here.',
    listItems: ['An item', 'A second item', 'A third item'],
    cardFooter: 'Card footer',
  };

  // Render the index.ejs file with the data
  res.render('index', { cardData });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//////////////////
// app.js
const express = require('express');
const mongoose = require('mongoose');
const Card = require('./models/card'); // Adjust the path based on your project structure



// ... (other middleware and configurations)

app.get('/', async (req, res) => {
  try {
    // Assuming you want to retrieve the first card from the database
    const cardData = await Card.findOne();

    if (!cardData) {
      return res.status(404).send('No card data found.');
    }

    // Respond with the card data
    res.render('index', { cardData }); // Adjust the rendering logic based on your template engine
  } catch (error) {
    console.error('Error retrieving card data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ... (other routes and server setup)

