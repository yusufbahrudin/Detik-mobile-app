"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Posts", "userMongoId", { type: Sequelize.STRING })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Posts", "userMongoId")
  },
}
