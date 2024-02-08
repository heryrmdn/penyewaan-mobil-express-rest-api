import BaseRouters from "./BaseRouters";
import UserController from "../controllers/UserController";
import { checkAuth } from "../middleware/AuthMiddleware";

class UserRoutes extends BaseRouters {
  public routes(): void {
    this.router.get("/", checkAuth, UserController.getUserDetail);
  }
}

export default new UserRoutes().router;