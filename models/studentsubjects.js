'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentSubjects = sequelize.define('StudentSubjects', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  } );

    StudentSubjects.associate = (models) => {
      StudentSubjects.belongsTo(models.Students)
      StudentSubjects.belongsTo(models.Subjects)
    }

  return StudentSubjects;
};
