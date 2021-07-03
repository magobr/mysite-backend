import { Router } from "express";
import { LoginController } from "./controller/LoginController";
import { UserController } from "./controller/UserController";
import { AuthMidleware } from "./midlewares/AuthMidleware";

const route = Router();

const User = new UserController;
const Login = new LoginController;

route.post('/user', AuthMidleware, User.store)
route.post("/login", Login.login);

export { route }