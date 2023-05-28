"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lesson.belongsTo(models.Chapter, {
        foreignKey: "chapterId",
        as: "chapter",
        onDelete: "CASCADE",
      });
    }
  }
  Lesson.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
      },
      title: DataTypes.STRING,
      chapterId: DataTypes.UUID,
      videoLink: DataTypes.STRING,
      thumbnailLink: DataTypes.STRING,
      duration: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Lesson",
    }
  );
  return Lesson;
};
