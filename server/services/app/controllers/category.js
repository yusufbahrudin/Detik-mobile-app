const { Category, sequelize } = require("../models")

class CategoryController {
  static async getCategory(req, res, next) {
    try {
      const category = await Category.findAll()
      res.status(200).json(category)
    } catch (err) {
      next(err)
    }
  }

  static async addCategory(req, res, next) {
    try {
      const category = await sequelize.transaction(async (transaction) => {
        const { name } = req.body
        return await Category.create({ name }, { transaction })
      })
      res.status(200).json(category)
    } catch (err) {
      next(err)
    }
  }

  static async editCategory(req, res, next) {
    try {
      const { id } = await sequelize.transaction(async (transaction) => {
        const { name } = req.body
        const { id } = req.params
        const category = await Category.findByPk(id)
        if (!category) throw { name: "NotFound", message: "Category Not Found" }

        await category.update({ name }, { transaction })

        return { id }
      })
      res.status(200).json({ message: `Category id ${id} updated` })
    } catch (err) {
      next(err)
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const category = await sequelize.transaction(async (transaction) => {
        const { id } = req.params

        const category = Category.findByPk(id)
        if (!category) throw { name: "NotFound", message: "Category not found" }

        await Category.destroy({ where: { id } }, { transaction })
        return id
      })
      res.status(200).json({ message: `Category ${category} deleted` })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = { CategoryController }
