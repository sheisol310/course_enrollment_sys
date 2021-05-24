const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page when click login on homepage 
router.get('/', forwardAuthenticated, (req, res) => res.render('login'));

// Dashboard_student
router.get('/dashboard_student', ensureAuthenticated, (req, res) =>
  res.render('dashboard_student', {
    user: req.user
  })
);

// Dashboard_professor
router.get('/dashboard_professor', ensureAuthenticated, (req, res) =>
  res.render('dashboard_professor', {
    user: req.user
  })
);

module.exports = router;