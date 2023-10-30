"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Category, { foreignKey: "categoryId" })
      Post.belongsTo(models.User, { foreignKey: "authorId" })
      Post.hasMany(models.Tag, { foreignKey: "postId" })
    }
  }
  Post.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title is required" },
          notNull: { msg: "Title is required" },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Slug is required" },
          notEmpty: { msg: "Slug is required" },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Content is required" },
          notEmpty: { msg: "Content is required" },
        },
      },
      imgUrl: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      userMongoId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "user Mongo ID is required" },
          notEmpty: { msg: "user Mongo ID is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
      hooks: {
        beforeCreate(post) {
          post.slug = post.slug.replace(/[,\?@%$# ]/g, "-").toLowerCase()
        },
      },
    }
  )
  return Post
}
