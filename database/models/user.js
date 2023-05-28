"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserRole, {
        foreignKey: "userId",
        as: "roles",
        onDelete: "CASCADE",
      });

      User.hasMany(models.Course, {
        foreignKey: "creatorUserId",
        as: "createdCourses",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      emailConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      balance: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      passwordHash: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      passwordSalt: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      profilePicture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
