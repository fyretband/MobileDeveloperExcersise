const express = require("express")
const router = express.Router()


const studentRouter = require('./student')
const courseRouter = require('./course')

router.use('/', studentRouter)
router.use('/', courseRouter)
module.exports = router