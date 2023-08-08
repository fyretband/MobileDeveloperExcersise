const express = require("express")
const router = express.Router()
const CourseController = require('../controllers/courseController')

router.post('/courses', CourseController.newCourse)
router.get('/courses', CourseController.fetchCourse)
router.put('/courses/:id', CourseController.editCourse)
router.post('/courseStudent/:courseId', CourseController.createCourseStudent)
module.exports = router