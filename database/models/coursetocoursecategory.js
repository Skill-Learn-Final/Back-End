"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseToCourseCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CourseToCourseCategory.init(
    {
      categoryId: DataTypes.UUID,
      courseId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "CourseToCourseCategory",
      timestamps: false,
    }
  );
  return CourseToCourseCategory;
};
