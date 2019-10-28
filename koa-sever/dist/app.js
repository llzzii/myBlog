"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa"); // koa框架
const bodyparser = require("koa-bodyparser");
const koaJwt = require("koa-jwt");
const Infos = require("./middleware/info");
const index_1 = require("./routes/index");
const app = new Koa();
app.use(bodyparser({
    enableTypes: ["json", "form", "text"],
}));
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
    path: [/\/api\/user/],
}));
module.exports = app;
