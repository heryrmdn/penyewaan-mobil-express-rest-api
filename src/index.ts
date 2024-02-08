import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { config as dotenv } from "dotenv";
import { sequelize } from "./db/models";
import AuthRoutes from "./routes/AuthRoutes";
import UserRoutes from "./routes/UserRoutes";
import CarRoutes from "./routes/CarRoutes";
import RentalRoutes from "./routes/RentalRoutes";
import ReturnRoutes from "./routes/ReturnRoutes";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  protected routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).send({ "message": "Welcome to Penyewaan Mobil Express RestAPI" });
    });

    this.app.use("/api/v1/auth", AuthRoutes);
    this.app.use("/api/v1/user", UserRoutes);
    this.app.use("/api/v1/car", CarRoutes);
    this.app.use("/api/v1/rental", RentalRoutes);
    this.app.use("/api/v1/return", ReturnRoutes);

    this.app.all("*", (req: Request, res: Response) => {
      res.status(404).send({ "message": "Path not found" });
    });
  }
}

const port: number = 8000;

const app = new App().app;
app.listen(port, async () => {

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log(`Server running on port ${port}`);
  } catch (err: any) {
    if (err instanceof Error) console.error('Unable to connect to the database: ', err.message);

    console.error('Internal server error');
  }
})