'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subjects = sequelize.define('Subjects', {
    subject_name: DataTypes.STRING
  });

  Subjects.associate = (models) =>{
    Subjects.hasMany(models.Teacher)
    Subjects.belongsToMany(models.Students, {through: 'StudentSubjects'})
  }


  return Subjects;
};
