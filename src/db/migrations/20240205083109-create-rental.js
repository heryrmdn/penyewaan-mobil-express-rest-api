"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rentals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tanggal_mulai: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      tanggal_selesai: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      car_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cars",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      jumlah_hari_penyewaan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jumlah_biaya_sewa: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Rentals");
  },
};
