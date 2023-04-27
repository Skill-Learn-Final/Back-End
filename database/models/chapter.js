"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chapter.belongsTo(models.Course, {
        foreignKey: "courseId",
        as: "course",
        onDelete: "CASCADE",
      });

      Chapter.hasMany(models.Lesson, {
        foreignKey: "chapterId",
        as: "lessons",
        onDelete: "CASCADE",
      });
    }
  }
  Chapter.init(
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
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Chapter",
    }
  );
  return Chapter;
};
