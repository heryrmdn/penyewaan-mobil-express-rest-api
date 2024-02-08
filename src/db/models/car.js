"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(models.user, {
        foreignKey: "userId"
      });
    }
  }
  Car.init(
    {
      merek: DataTypes.STRING,
      model: DataTypes.STRING,
      nomorPlat: DataTypes.STRING,
      tarifSewaPerHari: DataTypes.DOUBLE,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "car",
      underscored: true,
    }
  );
  return Car;
};
