const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { firstName, lastName, QcFirst, email, password, passwordConfirm, identity } = req.body;
  let errors = [];

  if (!firstName || !lastName || !QcFirst || !email || !password || !passwordConfirm || !identity) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      firstName,
      lastName,
      QcFirst,
      email,
      password,
      passwordConfirm,
      identity
    });
  } else {
    
    User.findOne({ QcFirst: QcFirst }).then(user => {
      if (user) {
        errors.push({ msg: 'ID already exists' });
        res.render('register', {
          errors: errors,
          firstName,
          lastName,
          QcFirst,
          email,
          password,
          passwordConfirm,
          identity
        });
    } else {
      const newUser = new User({
        firstName,
        lastName,
        QcFirst,
        email,
        password,
        passwordConfirm,
        identity
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              req.flash(
                'success_msg',
                'You are now registered. Please login your account.'
              );
              res.redirect('/users/login');
            })
            .catch(err => console.log(err));
        });
      });
    }
  
  });

    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors: errors,
          firstName,
          lastName,
          QcFirst,
          email,
          password,
          passwordConfirm,
          identity
        });
      } else {
        const newUser = new User({
          firstName,
          lastName,
          QcFirst,
          email,
          password,
          passwordConfirm,
          identity
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered. Please login your account.'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/users/login', failureFlash: true}), (req, res) => {
  
  const { email, password } = req.body;

  User.findOne({ email: email }).then(user => {
    if (user.identity === 'Student') {
      res.redirect('/dashboard_student');
    } else {
      res.redirect('/dashboard_professor');
    }});
    
  });

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;