'use strict';
module.exports = (sequelize, DataTypes) => {
  const tower = sequelize.define('tower', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(50)
    },
    
    location: {
      type: DataTypes.STRING(50)
    },
    floors: {
      type: DataTypes.INTEGER
    },
    offices: {
      type: DataTypes.INTEGER
    },
    rating: {
      type: DataTypes.INTEGER
    },
    latitude: {
      type: DataTypes.STRING(50)
    },
    longitude: {
      type: DataTypes.STRING(50)
    },
  }, {
    tableName:"tower"
  });
  return tower;
};