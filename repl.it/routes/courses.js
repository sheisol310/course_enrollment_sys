const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Load course model
const Course = require('../models/course');

// couse management 

router.get('/courseManagement', function (req, res) {
    console.log(req.query);
    console.log(req.query.name);
    if (req.query.name != null && req.query.name != undefined && req.query.name != '') {
        Course.findOne({className : req.query.name.replace(/"/g, '')}, function (err, course) {
            if (err) {
                return res.status(500).send('Server error');
            }
            if (course == undefined) {
                res.render('courseManagement.html', {
                    count: 0,
                    course: course
                })
            } else {
                res.render('courseManagement.html', {
                    count: 1,
                    course: course
                })
            }
        })
    } else {
        Course.find(function (err, courses) {
            if (err) {
                return res.status(500).send('Server error');
            }
            if (courses.length >= 3) {
                var top = [
                    courses[0],
                    courses[1],
                    courses[2],
                ]
            }
            res.render('courseManagement.html', {
                top: top,
                courses: courses
            })
        })
    }
})


// Add course
router.get('/addCourse', (req, res) => res.render('addCourse.html'));

router.post('/addCourse', function (req, res) {
    console.log(req.body);
    new Course(req.body).save(function (err) {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.redirect('courseManagement')
    })
})

// edit course
router.get('/editCourse', function (req, res) {
    Course.findById(req.query.id.replace(/"/g, ''), function (err, course) {
        if (err) {
            console.log(err)
            return res.status(500).send('Server error.');
        }
        console.log(req.query.id)
        res.render('editCourse.html', {
            course: course
        })
    })
})

router.post('/editCourse', function (req, res) {
     var id = req.body.id.replace(/"/g, '')
     Course.findByIdAndUpdate(id, req.body, function (err) {
         if (err) {
             return res.status(500).send('Server error.')
         }
         res.redirect('courseManagement')
     })
 })

// delete course 
router.get('/delete', function (req, res) {

     var id = req.query.id.replace(/"/g, '')
     Course.findByIdAndRemove(id, function (err) {
         if (err) {
             return res.status(500).send('Server error.')
         }
         res.redirect('courseManagement')
     })
 })

// go back to dashboard 
router.get('/courseManagement/dashboard_professor', forwardAuthenticated, (req, res) => res.render('dashboard_professor'));
router.get('/editCourse/dashboard_professor', forwardAuthenticated, (req, res) => res.render('dashboard_professor'));
router.get('/addCourse/dashboard_professor', forwardAuthenticated, (req, res) => res.render('dashboard_professor'));


module.exports = router;
 
