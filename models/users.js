'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING(50)
    },
    password: {
      type: DataTypes.STRING(50)
    },
  }, {
	tableName:"users"
  });
  return users;
};