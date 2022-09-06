import { Router } from "express";
import { UserController } from "../controller/user.js";

const router = new Router();
const controller = new UserController();

router.post('/login', controller.login)
router.post('/registration', controller.signUp)

export default router;