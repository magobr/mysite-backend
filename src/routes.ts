import { Router } from "express";
import { UserController } from "./controller/UserController";

const route = Router();

const User = new UserController;

route.post('/user', User.store)

export { route }