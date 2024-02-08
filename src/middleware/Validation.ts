import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

class Validation {
  run = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).send({ errors: errors.array()[0].msg });

    return next();
  }

  register = [
    check("name", "name is required").notEmpty(),
    check("email", "email is required").notEmpty(),
    check("email", "email must be in email format").isEmail(),
    check("password", "password is required").notEmpty(),
    check("alamat", "alamat is required").notEmpty(),
    check("nomorTelepon", "nomor telepon is required").notEmpty(),
    check("nomorSim", "nomor sim is required").notEmpty(),
  ];

  login = [
    check("email", "email is required").notEmpty(),
    check("email", "email must be in email format").isEmail(),
    check("password", "password is required").notEmpty(),
  ];

  addCar = [
    check("merek", "merek is required").notEmpty(),
    check("model", "model is required").notEmpty(),
    check("nomorPlat", "nomorPlat is required").notEmpty(),
    check("tarifSewaPerHari", "tarifSewaPerHari is required").notEmpty(),
  ];

  createRental = [
    check("tanggalMulai", "tanggalMulai is required").notEmpty(),
    check("tanggalSelesai", "tanggalSelesai is required").notEmpty(),
    check("carId", "carId is required").notEmpty(),
  ];

  checkReturn = [
    check("nomorPlat", "nomorPlat is required").notEmpty(),
  ]
}

export default new Validation();