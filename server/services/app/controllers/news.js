const { Post, Category, User, Tag, sequelize } = require("../models")

class News {
  static async getNews(req, res, next) {
    try {
      const news = await Post.findAll({ include: [{ model: Category }, { model: Tag }] })
      res.status(200).json(news)
    } catch (err) {
      next(err)
    }
  }

  static async getNewsBySlug(req, res, next) {
    try {
      const { slug } = req.params
      const news = await Post.findOne({
        include: [{ model: Category }, { model: Tag }],
        where: { slug },
      })
      res.status(200).json(news)
    } catch (err) {
      next(err)
    }
  }

  static async addNews(req, res, next) {
    console.log(req.body)
    try {
      const { news, tag } = await sequelize.transaction(async (transaction) => {
        const { title, content, imgUrl, categoryId, tags, authorId, userMongoId } = req.body
        const news = await Post.create(
          { title, slug: title, content, imgUrl, categoryId: parseInt(categoryId), authorId, userMongoId },
          { transaction }
        )

        tags.forEach((item) => (item.postId = news.id))

        const tag = await Tag.bulkCreate(tags, { transaction })
        return { news, tag }
      })

      res.status(200).json({ ...news.toJSON(), tag })
    } catch (err) {
      next(err)
    }
  }

  static async deleteNews(req, res, next) {
    try {
      const post = await sequelize.transaction(async (transaction) => {
        const { id } = req.params
        const post = await Post.findByPk(id)

        if (!post) throw { name: "NotFound", message: "Post not found" }

        await Post.destroy({ where: { id }, cascade: true }, { transaction })
        return post
      })

      res.status(200).json({ message: `Post id ${post.id} deleted` })
    } catch (err) {
      next(err)
    }
  }

  static async editNews(req, res, next) {
    try {
      const post = await sequelize.transaction(async (transaction) => {
        const { id } = req.params
        const { title, content, imgUrl, categoryId, tags } = req.body

        const post = await Post.findByPk(id)
        if (!post) throw { name: "NotFound", message: "Post not found" }

        await post.update({ title, content, imgUrl, categoryId, tags }, { transaction })
        return post
      })

      res.status(200).json({ message: `Post id ${post.id} updated` })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = { News }
