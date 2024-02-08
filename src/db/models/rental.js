'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rental.belongsTo(models.car, {
        foreignKey: "carId"
      });
      Rental.belongsTo(models.user, {
        foreignKey: "userId"
      });
    }
  }
  Rental.init({
    tanggalMulai: DataTypes.DATEONLY,
    tanggalSelesai: DataTypes.DATEONLY,
    carId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    jumlahHariPenyewaan: DataTypes.INTEGER,
    jumlahBiayaSewa: DataTypes.DOUBLE,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'rental',
    underscored: true,
  });
  return Rental;
};