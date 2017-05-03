const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; // для heroku

var app = express(); //создает новое express-приложение

hbs.registerPartials(__dirname + '/views/partials'); // Подключение Partials
app.set('view engine', 'hbs'); // определяет view engine

app.use((req, res, next) => { // Middleware
  var now = new Date().toString();
  var log = `${now}: ${req.ip} ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to srever.log');
    }
  });
  next();
});

// app.use((req, res, next) => { // Еще один Middleware
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our brand new website!'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to get the data'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "About page"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
