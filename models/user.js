'use strict';

const generate = require('../helpers/generateSalt');
const crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (models) =>{
        const secret = generate();
        const hash = crypto.createHmac('sha256', secret)
                           .update(models.password)
                           .digest('hex');
        models.password = hash;
        models.salt = secret;
      }
    }
  });


  return User;
};
