import * as Routers from "koa-router";

import { ControllerBlog } from "../controller/blogs";
import { getFiles } from "../controller/file";
import { ControllerUser } from "../controller/user";
export const router = new Routers();
const controllerUser = new ControllerUser();
const controllerBlog = new ControllerBlog();

// 关于用户
router.post("/api/user/login", controllerUser.login);
router.post("/api/createUser", controllerUser.createUser);
router.post("/api/updateUser", controllerUser.updateUser);
router.post("/api/updateImage", controllerUser.updateImage);
router.get("/api/user/getUser", controllerUser.getUser);

// 标签
router.get("/api/user/getTags", controllerBlog.getTags);
router.post("/api/addTag", controllerBlog.addTag);
// 博文
router.post("/api/addBlog", controllerBlog.addBlog);

router.get("/api/user/getBlogList", controllerBlog.getBlogList);
router.get("/api/user/getNewsBlog", controllerBlog.getBlogNewsList);
router.get("/api/user/getBlogDetail", controllerBlog.getBlogDetail);

// 评论
router.post("/api/addComment", controllerBlog.addComment);
router.post("/api/addLiker", controllerBlog.addLiker);
router.get("/api/user/getComment", controllerBlog.getComment);
router.delete("/api/deleteLiker", controllerBlog.deleteLiker);

// 静态资源服务器
router.get(/^\/images/, getFiles);
