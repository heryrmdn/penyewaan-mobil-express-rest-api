import { Request, Response } from "express";
import { Op } from "sequelize";
const db = require("../db/models");

class CarController {
  addCar = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.app.locals.user.id;
    const body = req.body;

    try {
      const cars = await db.car.findOne({ where: { nomorPlat: body.nomorPlat } });

      if (cars) return res.status(400).send({ "message": "Mobil gagal ditambahkan" });

      await db.car.create({
        merek: body.merek,
        model: body.model,
        nomorPlat: body.nomorPlat,
        tarifSewaPerHari: body.tarifSewaPerHari,
        userId,
      })

      return res.status(200).send({ "message": "Berhasil menambahkan mobil" });

    } catch (err: any) {
      if (err instanceof Error) return res.status(500).send({ "message": err.message });

      return res.status(500).send({ "message": "Internal server error" });
    }
  }

  getCars = async (req: Request, res: Response): Promise<Response> => {
    const merek = req.query.merek ? req.query.merek : "";
    const model = req.query.model ? req.query.model : "";
    const ketersediaan = req.query.ketersediaan ? req.query.ketersediaan : "";

    try {
      let cars = await db.car.findAll({
        where: {
          merek: { [Op.like]: `%${merek}%` },
          model: { [Op.like]: `%${model}%` }
        },
      });

      if (ketersediaan && ketersediaan === "true") {
        const dateNow = new Date().toJSON().toString().split("T")[0];

        const rentals = await db.rental.findAll({
          attributes: ["carId"],
          where: {
            [Op.or]: [
              { tanggalMulai: { [Op.lte]: dateNow } },
              { tanggalSelesai: { [Op.gte]: dateNow } }]
          }
        });

        const rentalsId = rentals.map((rental: any) => rental.carId);

        cars = await db.car.findAll({
          where: {
            merek: { [Op.like]: `%${merek}%` },
            model: { [Op.like]: `%${model}%` },
            id: { [Op.notIn]: rentalsId }
          },
        });
      }

      return res.status(200).send({ "data": cars });

    } catch (err: any) {
      if (err instanceof Error) return res.status(500).send({ "message": err.message });

      return res.status(500).send({ "message": "Internal server error" });
    }
  }
}

export default new CarController();