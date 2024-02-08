import { Request, Response } from "express";
import Authentication from "../utils/Authentication";
const db = require("../db/models");

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    const body = req.body;

    try {
      let isExistingUser = await db.user.findOne({ where: { email: body.email } });
      if (isExistingUser) return res.status(400).send({ "message": "Email sudah terdaftar" });

      const hashedPassword: string = await Authentication.passwordHash(body.password);

      await db.user.create({
        name: body.name,
        email: body.email,
        password: hashedPassword,
        alamat: body.alamat,
        nomorTelepon: body.nomorTelepon,
        nomorSim: body.nomorSim
      });

      return res.status(200).send({ "message": "Registrasi sukses" });

    } catch (err: any) {
      if (err instanceof Error) return res.status(500).send({ "message": err.message });

      return res.status(500).send({ "message": "Internal server error" });
    }
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    const body = req.body;

    try {
      let user = await db.user.findOne({ where: { email: body.email } });
      if (!user) return res.status(400).send({ "message": "Email tidak terdaftar" });

      const isValidPassword = await Authentication.passwordCompare(body.password, user.password);
      if (!isValidPassword) return res.status(400).send({ "message": "Password tidak sesuai" });

      const token = Authentication.generateToken(user.id, user.name, user.email);

      return res.status(200).send({
        "message": "Login sukses",
        "access_token": token,
        "token_type": "Bearer"
      });

    } catch (err: any) {
      if (err instanceof Error) return res.status(500).send({ "message": err.message });

      return res.status(500).send({ "message": "Internal server error" });
    }
  }
}

export default new AuthController();