import BaseRouters from "./BaseRouters";
import { checkAuth } from "../middleware/AuthMiddleware";
import CarController from "../controllers/CarController";
import Validation from "../middleware/Validation";

class CarRoutes extends BaseRouters {
  public routes(): void {
    this.router.post("/", checkAuth, Validation.addCar, Validation.run, CarController.addCar);
    this.router.get("/", checkAuth, CarController.getCars);
  }
}

export default new CarRoutes().router;