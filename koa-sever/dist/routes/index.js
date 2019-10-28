"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Routers = require("koa-router");
const blogs_1 = require("../controller/blogs");
const user_1 = require("../controller/user");
exports.router = new Routers();
const controllerUser = new user_1.ControllerUser();
const controllerBlog = new blogs_1.ControllerBlog();
// 关于用户
exports.router.post("/api/user/login", controllerUser.login);
exports.router.post("/api/createUser", controllerUser.createUser);
exports.router.post("/api/updateUser", controllerUser.updateUser);
exports.router.get("/api/getUser", controllerUser.getUser);
// 标签
exports.router.get("/api/getTags", controllerBlog.getTags);
exports.router.post("/api/addTag", controllerBlog.addTag);
// 博文
exports.router.post("/api/addBlog", controllerBlog.addBlog);
exports.router.get("/api/user/getBlogList", controllerBlog.getBlogList);
exports.router.get("/api/user/getNewsBlog", controllerBlog.getBlogNewsList);
exports.router.get("/api/user/getBlogDetail", controllerBlog.getBlogDetail);
// 评论
exports.router.post("/api/addComment", controllerBlog.addComment);
exports.router.post("/api/addLiker", controllerBlog.addLiker);
exports.router.get("/api/user/getComment", controllerBlog.getComment);
exports.router.delete("/api/deleteLiker", controllerBlog.deleteLiker);
