import { Request, Response } from "express";
const db = require("../db/models");

class ReturnController {
  createturn = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.app.locals.user.id;
    const body = req.body;

    try {
      const rental = await db.rental.findOne({
        include: {
          model: db.car,
          where: { nomorPlat: body.nomorPlat }
        },
        where: { userId, isActive: true },
      });
      
      if (!rental) return res.status(200).send({ "message": "Data tidak ditemukan" });

      await db.rental.update({ isActive: false }, { where: { id: rental.id } });

      return res.status(200).send({ "data": "Mobil berhasil dikembalikan" });

    } catch (err: any) {
      if (err instanceof Error) return res.status(500).send({ "message": err.message });

      return res.status(500).send({ "message": "Internal server error" });
    }
  }
}

export default new ReturnController();