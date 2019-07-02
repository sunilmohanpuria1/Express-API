'use strict';
module.exports = (sequelize, DataTypes) => {
  const contact = sequelize.define('contact', {
    contact_id: {type:DataTypes.INTEGER,
      primaryKey: true},
    user_id: DataTypes.INTEGER,
    contactNo:DataTypes.INTEGER,
    address: DataTypes.STRING
  }, {timestamps: false});
  contact.associate = function(models) {
    // associations can be defined here
  };
  return contact;
};