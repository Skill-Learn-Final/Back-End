"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.hasMany(models.Chapter, {
        foreignKey: "courseId",
        as: "chapters",
        onDelete: "CASCADE",
      });

      Course.belongsTo(models.User, {
        foreignKey: "creatorUserId",
        as: "creator",
        onDelete: "CASCADE",
      });
    }
  }
  Course.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      courseCategories: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
      },
      creatorUserId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      coursePosterLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
