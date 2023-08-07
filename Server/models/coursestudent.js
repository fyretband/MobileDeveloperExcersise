'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseStudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Student)
      this.belongsTo(models.Course)

    }
  }
  CourseStudent.init({
    StudentId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CourseStudent',
  });
  return CourseStudent;
};