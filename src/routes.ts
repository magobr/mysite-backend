import { Router } from "express";
// Controllers
import { LoginController } from "./controller/LoginController";
import { UserController } from "./controller/UserController";
import { NewsController } from "./controller/NewsController";
import { CategoriesController } from "./controller/CategoriesController";
// Midlewares
import { AuthMidleware } from "./midlewares/AuthMidleware";
import { Autorization } from "./midlewares/AutorizationMidleware";

const route = Router();

const User = new UserController;
const News = new NewsController;
const Login = new LoginController;
const Categories = new CategoriesController;

route.post("/login", Login.login);

route.post("/user", AuthMidleware, Autorization.LevelAdmin,  User.store)

route.post("/news/create", AuthMidleware, Autorization.LevelWriter, News.store);

route.post("/news/categories", AuthMidleware, Autorization.LevelAdmin, Categories.store);
export { route }