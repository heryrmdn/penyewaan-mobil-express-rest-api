import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config as dotenv } from "dotenv";

class Authentication {
  constructor() {
    dotenv();
  }

  passwordHash = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  }

  passwordCompare = async (text: string, encryptedText: string): Promise<Boolean> => {
    let result = await bcrypt.compare(text, encryptedText);

    return result;
  }

  generateToken = (id: number, name: string, email: string): string => {
    const secretKey: string = process.env.JWT_SECRET_KEY || "secret";

    const token: string = jwt.sign({ id, name, email }, secretKey);

    return token;
  }
}

export default new Authentication();