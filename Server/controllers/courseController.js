const { Course, Student, CourseStudent } = require("../models");

class CourseController {
    static async newCourse(req,res){
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
    }

    static async fetchCourse(req,res){
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
    }

    static async editCourse(req,res){
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
    }

    static async createCourseStudent(req,res){
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
    }
}

module.exports = CourseController