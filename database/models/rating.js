"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
      });
      // Rating.belongsTo(models.Course, {
      //   foreignKey: "courseId",
      //   as: "course",
      //   onDelete: "CASCADE",
      // });
    }
  }
  Rating.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      ratingScore: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      ratingMessage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Rating",
    }
  );
  return Rating;
};
