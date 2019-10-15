import * as Koa from "koa"; // koa框架
import * as bodyparser from "koa-bodyparser";
import * as koaJwt from "koa-jwt";

import * as Infos from "./middleware/info";

import { router } from "./routes/index";
const app = new Koa();

app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
// routes
app.use(router.routes());
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = Infos.reqErr("登陆过期，请重新登陆");
    }
  });
});
app.use(
  koaJwt({
    secret: "token",
  }).unless({
    path: [/\/api\/user/],
  })
);

module.exports = app;
