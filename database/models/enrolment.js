"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Enrolment extends Model {
    static associate(models) {
      Enrolment.hasMany(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
      });
      //   Enrolment.hasMany(models.Course, {
      //     foreignKey: "courseId",
      //     as: "course",
      //     onDelete: "CASCADE",
      //   });
    }
  }
  Enrolment.init(
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
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return Enrolment;
};
