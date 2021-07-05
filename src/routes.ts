import { Router } from "express";
import { LoginController } from "./controller/LoginController";
import { UserController } from "./controller/UserController";
import { AuthMidleware } from "./midlewares/AuthMidleware";
import { Autorization } from "./midlewares/AutorizationMidleware";

const route = Router();

const User = new UserController;
const Login = new LoginController;

route.post("/user", AuthMidleware, Autorization.LevelAdmin,  User.store)
route.post("/login", Login.login);

export { route }