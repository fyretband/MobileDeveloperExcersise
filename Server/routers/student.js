const express = require("express")
const router = express.Router()
const StudentController = require('../controllers/studentController')

router.post('/students', StudentController.createStudent)
router.get('/students', StudentController.fetchStudent)
router.put('/students/:id', StudentController.editStudent)
module.exports = router