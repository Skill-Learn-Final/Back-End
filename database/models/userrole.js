"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      UserRole.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
      });
    }
  }
  UserRole.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "creator", "learner", "reviewer"),
        defaultValue: "learner",
      },
    },
    {
      sequelize,
      modelName: "UserRole",
    }
  );
  return UserRole;
};
