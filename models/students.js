'use strict';
module.exports = function(sequelize, DataTypes) {
  var Students = sequelize.define('Students', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail:{
          msg: "Must be email format"
        }
        // ,
        // cekEmail:(value, next) =>{
        //   Students.findOne({
        //     where:{
        //       email: value
        //     }
        //   }).then(function(row){
        //     if(row != null){
        //       console.log();
        //       return next('email sudah d pake');
        //     }else {
        //       return next();
        //     }
        //   })
        // }
      }
    },
    jurusan: DataTypes.STRING
  });
  Students.associate = (models) =>{
    Students.belongsToMany(models.Subjects, {through: 'StudentSubjects'})
  }

  return Students;
};
