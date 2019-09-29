import * as Routers from "koa-router";

import { Controller } from "../controller/user";
export const router = new Routers();
const controller = new Controller();

router.post("/api/login", controller.login);
router.post("/api/createUser", controller.createUser);
router.post("/api/updateUser", controller.updateUser);
router.get("/api/getUser", controller.getUser);
