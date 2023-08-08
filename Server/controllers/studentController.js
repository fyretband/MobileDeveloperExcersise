const {Student} = require("../models")


class StudentController {
    static async createStudent(req,res){
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
    }

    static async fetchStudent(req,res){
        try {
            const students = await Student.findAll();
            res.status(200).json(students);
          } catch (error) {
            console.error("Error fetching students:", error);
            res
              .status(500)
              .json({ error: "An error occurred while fetching students." });
          }
    }

    static async editStudent(req,res){
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
    }
}

module.exports = StudentController