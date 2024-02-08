import BaseRouters from "./BaseRouters";
import { checkAuth } from "../middleware/AuthMiddleware";
import Validation from "../middleware/Validation";
import ReturnController from "../controllers/ReturnController";

class ReturnRoutes extends BaseRouters {
  public routes(): void {
    this.router.post("/", checkAuth, Validation.checkReturn, Validation.run, ReturnController.createturn);
  }
}

export default new ReturnRoutes().router;