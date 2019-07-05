'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id:{type:DataTypes.INTEGER,
	autoIncrement: true,
      primaryKey: true},
    Name: DataTypes.STRING,
    AdharNo: DataTypes.BIGINT
  }, {timestamps: false});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
