import { Router } from "express";
import { LoginController } from "./controller/LoginController";
import { UserController } from "./controller/UserController";
import { NewsController } from "./controller/NewsController";
import { AuthMidleware } from "./midlewares/AuthMidleware";
import { Autorization } from "./midlewares/AutorizationMidleware";

const route = Router();

const User = new UserController;
const News = new NewsController;
const Login = new LoginController;

route.post("/user", AuthMidleware, Autorization.LevelAdmin,  User.store)
route.post("/login", Login.login);

route.post("/news/create", AuthMidleware, Autorization.LevelWriter, News.store);

export { route }