"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsTo(models.Post, { foreignKey: "postId" })
    }
  }
  Tag.init(
    {
      postId: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        valifate: {
          notEmpty: { msg: "Name is required" },
          notEmpty: { msg: "Name is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Tag",
    }
  )
  return Tag
}
