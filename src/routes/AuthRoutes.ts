import BaseRouters from "./BaseRouters";
import Validation from "../middleware/Validation";
import AuthController from "../controllers/AuthController";

class AuthRoutes extends BaseRouters {
  public routes(): void {
    this.router.post("/register", Validation.register, Validation.run, AuthController.register);
    this.router.post("/login", Validation.login, Validation.run, AuthController.login);
  }
}

export default new AuthRoutes().router;