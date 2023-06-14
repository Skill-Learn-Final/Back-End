"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Comment.belongsTo(models.User, {
        foreignKey: "commenterId",
        as: "commenter",
      });

      Comment.belongsTo(models.Course, {
        foreignKey: "courseId",
        as: "course",
      });

      Comment.belongsTo(models.Comment, {
        foreignKey: "replyTo",
        as: "parent",
        onDelete: "CASCADE",
      });

      Comment.hasMany(models.Comment, {
        foreignKey: "replyTo",
        as: "replies",
      });
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      commenterId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      replyTo: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Comments",
          key: "id",
          as: "parent",
        },
      },
      isReported: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
