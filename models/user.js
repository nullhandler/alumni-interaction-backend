'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts',
        onDelete: 'CASCADE',
      });
  
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        as: 'comments',
        onDelete: 'CASCADE',
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    desc: DataTypes.TEXT,
    phone: { type: DataTypes.STRING, primaryKey: true},
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};