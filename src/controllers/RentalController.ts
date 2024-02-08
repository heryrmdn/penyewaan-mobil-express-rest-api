import { Request, Response } from "express";
import { Op } from "sequelize";
const db = require("../db/models");

class RentalController {
  createRental = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.app.locals.user.id;
    const body = req.body;

    try {
      const car = await db.car.findOne({ where: { id: body.carId } });
      if (!car) return res.status(404).send({ "data": "Data mobil tidak ditemukan" });

      const rentals = await db.rental.findAll({
        where: {
          [Op.or]: [
            {
              carId: body.carId,
              tanggalMulai: { [Op.lte]: body.tanggalMulai },
              tanggalSelesai: { [Op.gte]: body.tanggalMulai }
            },
            {
              [Op.and]: [
                { carId: body.carId },
                { tanggalMulai: { [Op.gt]: body.tanggalMulai } },
                { tanggalMulai: { [Op.lt]: body.tanggalSelesai } }

              ]
            },
            { carId: body.carId, tanggalMulai: body.tanggalSelesai }
          ]
        }
      });

      if (rentals.length > 0) return res.status(400).send({ "data": "Mobil tidak dapat disewa" });

      const startDate = new Date(body.tanggalMulai);
      const finishDate = new Date(body.tanggalSelesai);
      const dateDiff = Math.abs(startDate.getTime() - finishDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
      const totalCost = dateDiff * car.tarifSewaPerHari

      await db.rental.create({
        tanggalMulai: body.tanggalMulai,
        tanggalSelesai: body.tanggalSelesai,
        carId: body.carId,
        userId,
        jumlahHariPenyewaan: dateDiff,
        jumlahBiayaSewa: totalCost,
        isActive: true
      })

      return res.status(200).send({ "data": "Berhasil menambahkan jadwal" });

    } catch (err: any) {
      if (err instanceof Error) return res.status(500).send({ "message": err.message });

      return res.status(500).send({ "message": "Internal server error" });
    }
  }

  getRentals = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.app.locals.user.id;

    try {
      const rentals = await db.rental.findAll({
        include: {
          model: db.car,
          attributes: ["merek", "model", "nomorPlat"],
        },
        where: { userId: userId },
      })

      return res.status(200).send({ "data": rentals });

    } catch (err: any) {
      if (err instanceof Error) return res.status(500).send({ "message": err.message });

      return res.status(500).send({ "message": "Internal server error" });
    }
  }
}

export default new RentalController();