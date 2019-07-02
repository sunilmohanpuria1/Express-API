'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id:{type:DataTypes.INTEGER,
      primaryKey: true},
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {timestamps: false});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};