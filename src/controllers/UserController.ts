import { Request, Response } from "express";
const db = require("../db/models");

class UserController {
  getUserDetail = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.app.locals.user.id;

    try {
      const user = await db.user.findOne({
        attributes: ["id", "name", "email", "alamat", "nomorTelepon", "nomorSim"],
        where: { id: userId }
      });

      return res.status(200).send({ "data": user });

    } catch (err: any) {
      if (err instanceof Error) return res.status(500).send({ "message": err.message });

      return res.status(500).send({ "message": "Internal server error" });
    }
  }
}

export default new UserController();