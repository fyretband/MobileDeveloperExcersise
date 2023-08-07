const cors = require('cors')
const express = require("express");
const app = express();
const port = 3000;

const { Course, Student, CourseStudent } = require("./models");
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/students", async (req, res) => {
  try {
    const { name, dob } = req.body;
    const student = await Student.create({ name, dob });
    res.status(201).json(student);
  } catch (error) {
    console.error("Error adding student:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the student." });
  }
});
app.get("/students", async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching students." });
  }
});
app.put('/students/:id', async (req, res) => {
    try {
      const studentId = req.params.id;
      const { name, dob } = req.body;
  
      const student = await Student.findByPk(studentId);
      if (!student) {
        return res.status(404).json({ error: 'Student not found.' });
      }
  
      student.name = name;
      student.dob = dob;
      await student.save();
  
      res.status(200).json(student);
    } catch (error) {
      console.error('Error editing student:', error);
      res.status(500).json({ error: 'An error occurred while editing the student.' });
    }
  });
  app.post('/courses', async (req, res) => {
    try {
      const { name, studentIds } = req.body;
  
      // Create the course
      const course = await Course.create({ name });
  
      // Associate students with the course through CourseStudent
      if (studentIds && studentIds.length > 0) {
        const students = await Student.findAll({
          where: { id: studentIds },
        });
        await course.addStudents(students, { through: CourseStudent });
      }
  
      res.status(201).json(course);
    } catch (error) {
      console.error('Error adding course:', error);
      res.status(500).json({ error: 'An error occurred while adding the course.' });
    }
  });
  app.get('/courses', async (req, res) => {
    try {
      const courses = await Course.findAll({
        include: {
          model: Student,
         
         
        },
      });
  
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'An error occurred while fetching courses.' });
    }
  });
  app.put('/courses/:id', async (req, res) => {
    try {
      const courseId = req.params.id;
      const { name, studentIds } = req.body;
  
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Update course name
      await course.update({ name });
  
      // Update associated students
      if (studentIds && studentIds.length > 0) {
        const students = await Student.findAll({
          where: { id: studentIds },
        });
        await course.setStudents(students);
      }
  
      res.status(200).json(course);
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ error: 'An error occurred while updating the course.' });
    }
  });
  app.post('/courseStudent/:courseId', async (req, res, next) => {
    try {
        const { id } = req.params
        const { StudentId, CourseId } = req.body
        const data = await CourseStudent.create({ CourseId, StudentId })
        if (!data) throw { name: 'notFound' }
        res.status(201).json({
            id: id,
            StudentId: data.StudentId,
            CourseId: data.CourseId,

        })
    } catch (error) {
        if (error.name === 'notFound') {
            res.status(404).json({
                "message": "Course not found"
            })
        } else {
            console.log(error)
            res.status(500).json({
                "message": "Internal Server Error"
            })
        }
    }
})
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
