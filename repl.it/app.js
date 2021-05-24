const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
var bodyParser = require('body-parser');

const app = express();

// Request CSS, JS, and IMG
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Passport Config
require('./config/passport')(passport);

// DB congih
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect(db, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then (() => {
    console.log(mongoose.connection.readyState);
    console.log(`mongoose is connecting successfully`);
}). catch((e) => {
    console.log(`no connection`);
})

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// HTML
app.engine('html',require('express-art-template'));


// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());


// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/courses', require('./routes/courses.js'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server is listening on prot ${PORT}`));