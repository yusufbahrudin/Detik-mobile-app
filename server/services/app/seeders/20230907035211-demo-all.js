"use strict"

const { hash } = require("../helpers/bcrypt")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        username: "gilang",
        email: "hahahehe@gmail.com",
        password: "hahahehe",
      },
    ]

    const categories = [{ name: "sport" }, { name: "politik" }]
    const tags = [
      { name: "#tranding", postId: 1 },
      { name: "#hot", postId: 1 },
      { name: "#today", postId: 1 },
    ]

    const posts = [
      {
        id: 1,
        title: "AHY Dicita, Malah Imin yang Tiba",
        slug: "AHY-Dicita-Malah-Imin-yang-Tiba",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At repudiandae possimus quasi libero non, ratione, iure voluptas qui velit dolore similique id eum ipsam temporibus doloribus modi quo, eius sit accusantium accusamus. Aspernatur eveniet inventore delectus velit numquam accusantium aliquam enim quia provident, suscipit quaerat dignissimos cumque ab dolore non! Lorem ipsum dolor sit, amet consectetur adipisicing elit. At repudiandae possimus quasi libero non, ratione, iure voluptas qui velit dolore similique id eum ipsam temporibus doloribus modi quo, eius sit accusantium accusamus. Aspernatur eveniet inventore delectus velit numquam accusantium aliquam enim quia provident, suscipit quaerat dignissimos cumque ab dolore non! Lorem ipsum dolor sit, amet consectetur adipisicing elit. At repudiandae possimus quasi libero non, ratione, iure voluptas qui velit dolore similique id eum ipsam temporibus doloribus modi quo, eius sit accusantium accusamus. Aspernatur eveniet inventore delectus velit numquam accusantium aliquam enim quia provident, suscipit quaerat dignissimos cumque ab dolore non! Lorem ipsum dolor sit, amet consectetur adipisicing elit. At repudiandae possimus quasi libero non, ratione, iure voluptas qui velit dolore similique id eum ipsam temporibus doloribus modi quo, eius sit accusantium accusamus. Aspernatur eveniet inventore delectus velit numquam accusantium aliquam enim quia provident, suscipit quaerat dignissimos cumque ab dolore non! Lorem ipsum dolor sit, amet consectetur adipisicing elit. At repudiandae possimus quasi libero non, ratione, iure voluptas qui velit dolore similique id eum ipsam temporibus doloribus modi quo, eius sit accusantium accusamus. Aspernatur eveniet inventore delectus velit numquam accusantium aliquam enim quia provident, suscipit quaerat dignissimos cumque ab dolore non!",
        imgUrl: "https://cdnv.detik.com/videoservice/AdminTV/2023/09/04/25a783eaa11041a083ab018fa56f86a3-20230904134933-0s.jpg?w=250&q=90",
        createdAt: "2012-01-01",
        updatedAt: "2012-01-01",
        categoryId: "1",
        authorId: 1,
        userMongoId: "6507eb2357d8ce711eff3215",
      },
    ]

    users.forEach((item) => {
      item.password = hash(item.password)
      item.createdAt = item.updatedAt = new Date()
    })

    posts.forEach((item) => {
      item.slug = item.slug.replace(/[,\?@%$# ]/g, "-").toLowerCase()
      item.createdAt = item.updatedAt = new Date()
      delete item.id
    })

    categories.forEach((item) => (item.createdAt = item.updatedAt = new Date()))
    tags.forEach((item) => (item.createdAt = item.updatedAt = new Date()))

    await queryInterface.bulkInsert("Users", users)
    await queryInterface.bulkInsert("Categories", categories)
    await queryInterface.bulkInsert("Posts", posts)
    await queryInterface.bulkInsert("Tags", tags)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
    await queryInterface.bulkDelete("Categories", null, {})
    await queryInterface.bulkDelete("Posts", null, {})
    await queryInterface.bulkDelete("Tags", null, {})
  },
}
