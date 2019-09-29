"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa"); // koa框架
const bodyparser = require("koa-bodyparser");
const router = require("./routes/index");
const app = new Koa();
app.use(bodyparser({
    enableTypes: ["json", "form", "text"],
}));
// routes
app.use(router.routes());
// app.use(async (ctx, next) => {
//   return next().catch((err) => {
//     if (err.status === 401) {
//       ctx.status = 401;
//       ctx.body = info.err("登陆过期，请重新登陆");
//     }
//   });
// });
// app.use(
//   koaJwt({
//     secret: "token",
//   }).unless({
//     path: ["/api/login"],
//   })
// );
module.exports = app;
//# sourceMappingURL=app.js.map