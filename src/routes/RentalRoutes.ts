import BaseRouters from "./BaseRouters";
import { checkAuth } from "../middleware/AuthMiddleware";
import Validation from "../middleware/Validation";
import RentalController from "../controllers/RentalController";

class RentalRoutes extends BaseRouters {
  public routes(): void {
    this.router.post("/", checkAuth, Validation.createRental, Validation.run, RentalController.createRental);
    this.router.get("/", checkAuth, RentalController.getRentals);
  }
}

export default new RentalRoutes().router;