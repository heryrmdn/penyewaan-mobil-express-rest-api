import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config as dotenv } from "dotenv";
dotenv();

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const secretKey = process.env.JWT_SECRET_KEY || "secret";

  if (!token) return res.status(401).send({ "message": "Token kosong" });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send(err);

    req.app.locals.user = user;
    
    next();
  })
}