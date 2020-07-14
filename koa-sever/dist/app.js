"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa"); // koa框架
const bodyparser = require("koa-bodyparser");
const koaJwt = require("koa-jwt");
const Infos = require("./middleware/info");
const index_1 = require("./routes/index");
const static2 = require("koa-static"); // 静态资源服务插件
const path = require("path"); // 路径管理
const koaBody = require("koa-body");
const app = new Koa();
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024,
    },
}));
app.use(bodyparser({
    enableTypes: ["json", "form", "text"],
}));
// 配置静态资源
// const staticPath = "./static";
// app.use(static2(path.join(__dirname, staticPath)));
// routes
app.use(index_1.router.routes());
app.use(async (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = Infos.reqErr("登陆过期，请重新登陆");
        }
    });
});
app.use(koaJwt({
    secret: "token",
}).unless({
    path: [/^((?!\/api\/user).)*$/, /^((?!\/images).)*$/],
}));
module.exports = app;
