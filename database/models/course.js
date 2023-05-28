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

      Course.belongsToMany(models.CourseCategory, {
        through: models.CourseToCourseCategory,
        as: "categories",
        foreignKey: "courseId",
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
      creatorUserId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      coursePosterLink: DataTypes.STRING,
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      difficulty: {
        type: DataTypes.ENUM("Beginner", "Intermediate", "Advanced"),
        allowNull: false,
      },
      isReviewed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Course",
      indexes: [
        {
          unique: true,
          fields: ["creatorUserId", "title"],
        },
      ],
    }
  );
  return Course;
};
