"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VirtualCurrencyBalance extends Model {
    static associate(models) {
      VirtualCurrencyBalance.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
      });
    }
  }
  VirtualCurrencyBalance.init(
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
      balance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "VirtualCurrencyBalance",
    }
  );
  return VirtualCurrencyBalance;
};
