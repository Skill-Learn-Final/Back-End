"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProfileVerification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProfileVerification.belongsTo(models.User, {
        foreignKey: "creatorId",
        as: "creator",
      });
    }
  }
  ProfileVerification.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      creatorId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      professionalTitle: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      governmentIdLink: { type: DataTypes.STRING, allowNull: false },
      proofDocumentLink: { type: DataTypes.STRING, allowNull: false },
      isReviewed: { type: DataTypes.BOOLEAN, defaultValue: false },
      isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "ProfileVerification",
    }
  );
  return ProfileVerification;
};
