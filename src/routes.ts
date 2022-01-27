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
route.get("/logout", Login.logout);
// User
route.post("/user", AuthMidleware, Autorization.LevelAdmin,  User.store)
route.get("/user", AuthMidleware, Autorization.LevelAdmin,  User.find);
route.get("/user/:id", AuthMidleware, Autorization.LevelAdmin,  User.find);
route.delete("/user/:id", AuthMidleware, Autorization.LevelAdmin,  User.del);
route.put("/user/:id", AuthMidleware, Autorization.LevelAdmin,  User.update);
route.get("/user/get/type", AuthMidleware, Autorization.LevelAdmin, User.getUserType);
// News
route.post("/news/create", AuthMidleware, Autorization.LevelWriter, News.store);
route.post("/news/categories", AuthMidleware, Autorization.LevelWriter, Categories.store);
route.get("/news/categories", AuthMidleware, Autorization.LevelWriter, Categories.find);
route.get("/news/categories/:id", AuthMidleware, Autorization.LevelWriter, Categories.find);
route.get("/news", News.find);
route.get("/news/:id", News.find);
route.delete("/news/:id", AuthMidleware, Autorization.LevelAdmin, News.del);
route.put("/news/:id", AuthMidleware, Autorization.LevelAdmin, News.update);

export { route }