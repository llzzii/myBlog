import { User } from "../entity";
import * as Infos from "../middleware/info";
import * as Users from "../model/user";
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const fs = require("fs");
let path = require("path");
// 登录

export class ControllerUser {
  constructor() {}
  login = async (ctx: any) => {
    const userinfo: User = ctx.request.body;
    const password = md5(md5(userinfo.user_password).substr(4, 7) + md5(userinfo.user_password));
    try {
      const data = await Users.login(userinfo.user_name);
      if (data[0]) {
        if (data[0].user_password === password) {
          const token = jwt.sign(
            {
              name: data[0].user_name,
              _id: data[0].user_id,
            },
            "token",
            {
              expiresIn: "0.5h",
            }
          );
          ctx.body = Infos.reqSuc("登录成功", token);
        } else {
          ctx.body = Infos.reqErr("账号或密码错误");
        }
      } else {
        ctx.body = Infos.reqErr("用户不存在", "noUser");
      }
    } catch (err) {
      ctx.body = Infos.reqErr("操作失败:" + err);
    }
  };
  createUser = async (ctx: any) => {
    let userinfo: User = new User();
    Object.assign(userinfo, ctx.request.body);
    const password = md5(md5(userinfo.user_password).substr(4, 7) + md5(userinfo.user_password));
    const created_time = new Date(+new Date() + 8 * 3600 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const id = Infos.uuid(8, 16);
    userinfo["user_password"] = password;
    userinfo["user_created_time"] = created_time;
    userinfo["user_id"] = id;
    userinfo["user_ip"] = ctx.request.ip;
    try {
      const isHasUser = await Users.login(userinfo.user_name);
      if (isHasUser.length === 0) {
        const data = await Users.createUser(userinfo);
        if (data.affectedRows) {
          ctx.body = Infos.reqSuc("添加成功");
        } else {
          ctx.body = Infos.reqErr("添加失败");
        }
      } else {
        ctx.body = Infos.reqErr("用户已存在");
      }
    } catch (err) {
      ctx.body = Infos.reqErr("操作失败:" + err);
    }
  };
  updateUser = async (ctx: any) => {
    let userinfo: User = new User();
    Object.assign(userinfo, ctx.request.body);
    const updated_time = new Date(+new Date() + 8 * 3600 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    userinfo["user_updated_time"] = updated_time;
    userinfo["user_ip"] = ctx.request.ip;
    try {
      const isHasUser = await Users.login(userinfo.user_name);
      if (isHasUser.length !== 0) {
        Object.assign(isHasUser[0], userinfo);
        if (userinfo.user_birthday !== "") {
          userinfo["user_birthday"] = new Date(userinfo.user_birthday)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        }

        const data = await Users.updateUser(userinfo);
        if (data.affectedRows) {
          ctx.body = Infos.reqSuc("修改成功");
        } else {
          ctx.body = Infos.reqErr("修改失败");
        }
      } else {
        ctx.body = Infos.reqErr("用户不存在");
      }
    } catch (err) {
      ctx.body = Infos.reqErr("操作失败:" + err);
    }
  };
  updateImage = async (ctx: any) => {
    if (ctx.header == null || ctx.header.authorization == null) {
      ctx.body = Infos.reqErr("操作失败:请先登录");
    }
    let tokenCookie = ctx.header.authorization.split(" ")[1];
    let token = jwt_decode(tokenCookie, "token");
    try {
      const datas = await Users.getUser(token._id);
      if (datas && datas.length > 0) {
        let imgurl = datas[0]["user_imgurl"];
        fs.unlink(path.join(__dirname, "../static/images/") + imgurl, (err: any) => {
          if (err) {
            console.log(`文件: ${imgurl} 删除失败！`);
          } else {
            console.log(`文件: ${imgurl} 删除成功！`);
          }
        });
      }
    } catch (err) {}

    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let namee = `${token._id}${file.name}`;
    let filePath = path.join(__dirname, "../static/images/") + namee;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    try {
      const data = await Users.updateUserImg(token._id, namee);
      if (data.affectedRows) {
        ctx.body = Infos.reqSuc("修改成功", filePath);
      } else {
        ctx.body = Infos.reqErr("修改失败");
      }
    } catch (err) {
      ctx.body = Infos.reqErr("操作失败:" + err);
    }
  };
  getUser = async (ctx: any) => {
    let params = ctx.querystring;
    let username: string = Infos.getParamsQuary("username", params);
    if (ctx.header == null || ctx.header.authorization == null) {
      ctx.body = Infos.reqErr("操作失败:请先登录");
    }
    let tokenCookie = ctx.header.authorization.split(" ")[1];
    let token = jwt_decode(tokenCookie, "token");
    try {
      const isHasUser = await Users.getUser(token._id);
      if (isHasUser.length === 0) {
        ctx.body = Infos.reqErr("用户不存在");
      } else {
        ctx.body = Infos.reqSuc("获取成功", isHasUser);
      }
    } catch (err) {
      ctx.body = Infos.reqErr("操作失败:" + err);
    }
  };
}
