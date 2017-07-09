const express = require('express');
const hbs = require('hbs'); //library for template rendering with {{data}} like django
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials'); // partials = django's extends feature, and use {{< partialsname }} format
app.set('view engine', 'hbs'); //setting the hbs library under the views folder

app.use((req, res, next) => { //call next when your middleware is done running
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url} ${req.ip}`;
  console.log(log);
  fs.appendFile('server.log', log + "\n", (err) =>{
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});


// app.use((req, res, next) => {
//   res.render('maintenance.hbs'); //no next() call so the follow functions will not run.
// }); //uncomment this when you want to perform maintenance for the site

app.use(express.static(__dirname + '/public')); //middleware to find static files.

hbs.registerHelper('getCurrentYear', () => { //helper function takes 2 parameter, name of function and the function defination. use the function name in the templates to render the data.
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/' // root of directory
, (req, res) => { //request info and send info
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello visitor!',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  }); //render any of your templates in your view engine, second argument is an object to render in hbs file

});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'An error is encountered'
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000'); // second parameter is optional
}); //bind a port to our app



//*********
// to create an simple website with no backend, only 4 lines of code in server.js is needed {
//   1. const express = require('express');
//   2. var app = express();
//   3. app.use(express.static(__dirname + 'relative path from root of directory to your folder with the desired html file'));
//   4. app.listen(port you want)
// }
