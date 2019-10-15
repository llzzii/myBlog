import { Blog, Comment, Tag, User } from "../entity";
import * as Infos from "../middleware/info";
import * as Blogs from "../model/blogs";
import * as Users from "../model/user";
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
// 登录

export class ControllerBlog {
  constructor() {}

  getTags = async (ctx: any) => {
    try {
      const allTags = await Blogs.getTags();
      ctx.body = Infos.reqSuc("获取成功", allTags);
    } catch (err) {
      ctx.body = Infos.reqErr("操作失败:" + err);
    }
  };
  addTag = async (ctx: any) => {
    let tagArr = ctx.request.body.tags;
    let ids = [];
    if (tagArr && tagArr.length > 0) {
      for (let i = 0; i < tagArr.length; i++) {
        try {
          const isHasTag = await Blogs.getTag(tagArr[i]);
          if (isHasTag.length === 0) {
            let tags: Tag = new Tag();
            const created_time = new Date(+new Date() + 8 * 3600 * 1000)
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");
            tags["tag_created_time"] = created_time;
            tags["tag_id"] = Infos.uuid(8, 16);
            tags["tag_name"] = tagArr[i];
            const data = await Blogs.addTags(tags);
            if (data.affectedRows) {
              ids.push(tags["tag_id"]);
            } else {
              ctx.body = Infos.reqErr("添加失败");
            }
          } else {
            ids.push(isHasTag[0]["tag_id"]);
          }
          ctx.body = Infos.reqSuc("添加成功", ids);
        } catch (err) {
          ctx.body = Infos.reqErr("操作失败:" + err);
        }
      }
    }
  };
  addBlog = async (ctx: any) => {
    let bloginfo: Blog = new Blog();
    Object.assign(bloginfo, ctx.request.body);
    if (ctx.header == null || ctx.header.authorization == null) {
      ctx.body = Infos.reqErr("操作失败:请先登录");
    }
    let tokenCookie = ctx.header.authorization.split(" ")[1];
    let token = jwt_decode(tokenCookie, "token");
    const created_time = new Date(+new Date() + 8 * 3600 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const id = Infos.uuid(8, 16);
    bloginfo["blog_created_time"] = created_time;
    bloginfo["blog_id"] = id;
    bloginfo["user_id"] = token._id;
    try {
      const data = await Blogs.addBlogs(bloginfo);
      if (data.affectedRows) {
        for (let i = 0; i < bloginfo.tags.length; i++) {
          this.addBlogAndTag(id, bloginfo.tags[i]);
        }
        ctx.body = Infos.reqSuc("添加成功");
      } else {
        ctx.body = Infos.reqErr("添加失败");
      }
    } catch (err) {
      ctx.body = Infos.reqErr("操作失败:" + err);
    }
  };
  addBlogAndTag = async (blog_id: string, tag_id: string) => {
    let info: any = {};
    info["blog_id"] = blog_id;
    info["tag_id"] = tag_id;
    try {
      const data = await Blogs.addBlogAndTag(info);
      if (data.affectedRows) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  getBlogList = async (ctx: any) => {
    let params = ctx.querystring;
    let current: number = parseInt(Infos.getParamsQuary("current", params), 0);
    try {
      const allBlogs = await Blogs.getBlogAndTag(current);
      ctx.body = Infos.reqSuc("获取成功", allBlogs);
    } catch (err) {
      ctx.body = Infos.reqErr("操作失败:" + err);
    }
  };
  getBlogNewsList = async (ctx: any) => {
    try {
      const allBlogs = await Blogs.getBlogNews();
      ctx.body = Infos.reqSuc("获取成功", allBlogs);
    } catch (err) {
      ctx.body = Infos.reqErr("操作失败:" + err);
    }
  };
  getBlogDetail = async (ctx: any) => {
    let params = ctx.querystring;
    let blog_id = Infos.getParamsQuary("id", params);
    try {
      const allBlogs = await Blogs.getBlogDetail(blog_id);
      const allCommentCount = await Blogs.getComentCount(blog_id);
      let userInfo = await Users.getUser(allBlogs[0].user_id);
      allBlogs[0]["allCommentCount"] = allCommentCount[0].num;
      allBlogs[0]["userInfo"] = userInfo[0];
      ctx.body = Infos.reqSuc("获取成功", allBlogs);
    } catch (err) {
      ctx.body = Infos.reqErr("操作失败:" + err);
    }
  };

  addComment = async (ctx: any) => {
    let commentinfo: Comment = new Comment();
    Object.assign(commentinfo, ctx.request.body);
    if (ctx.header == null || ctx.header.authorization == null) {
      ctx.body = Infos.reqErr("操作失败:请先登录");
    }
    let tokenCookie = ctx.header.authorization.split(" ")[1];
    let token = jwt_decode(tokenCookie, "token");
    const created_time = new Date(+new Date() + 8 * 3600 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const id = Infos.uuid(8, 16);
    commentinfo["comment_created_time"] = created_time;
    commentinfo["comment_id"] = id;
    commentinfo["comment_user_id"] = token._id;
    try {
      const data = await Blogs.addComment(commentinfo);
      if (data.affectedRows) {
        ctx.body = Infos.reqSuc("添加成功", data);
      } else {
        ctx.body = Infos.reqErr("添加失败");
      }
    } catch (err) {
      ctx.body = Infos.reqErr("操作失败:" + err);
    }
  };
  getComment = async (ctx: any) => {
    let params = ctx.querystring;
    let blog_id = Infos.getParamsQuary("id", params);
    let isLiker = false;
    let tokenCookie;
    let token;
    if (ctx.header != null && ctx.header.authorization != null) {
      tokenCookie = ctx.header.authorization.split(" ")[1];
      token = jwt_decode(tokenCookie, "token");
    }

    try {
      const allComment = await Blogs.getComent(blog_id);

      if (allComment != null && allComment.length > 0) {
        for (let i = 0; i < allComment.length; i++) {
          isLiker = false;
          let commentChild = await Blogs.getComent(blog_id, allComment[i].comment_id);
          let userInfo = await Users.getUser(allComment[i].comment_user_id);
          let replayUserInfo = await Users.getUser(allComment[i].replied_user_id);

          if (commentChild && commentChild.length > 0) {
            for (let k = 0; k < commentChild.length; k++) {
              isLiker = false;
              let c_userInfo = await Users.getUser(commentChild[k].comment_user_id);
              let c_replayUserInfo = await Users.getUser(commentChild[k].replied_user_id);
              commentChild[k]["commentUser"] = c_userInfo;
              commentChild[k]["replayUser"] = c_replayUserInfo;
              let isLikes: any = await Blogs.getLiker(commentChild[k].comment_id);
              if (token != null && token._id != null) {
                if (isLikes.length > 0) {
                  for (let t = 0; t < isLikes.length; t++) {
                    isLiker = false;
                    if (isLikes[t].user_id === token._id) {
                      isLiker = true;
                      break;
                    }
                  }
                }
              }
              commentChild[k]["Like_count"] = isLikes.length;
              commentChild[k]["isLike"] = isLiker;
            }
          }

          allComment[i]["children"] = commentChild;
          allComment[i]["commentUser"] = userInfo;
          allComment[i]["replayUser"] = replayUserInfo;
          let isLike = await Blogs.getLiker(allComment[i].comment_id);
          if (token != null && token._id != null) {
            if (isLike.length > 0) {
              for (let t = 0; t < isLike.length; t++) {
                isLiker = false;
                if (isLike[t].user_id === token._id) {
                  isLiker = true;
                  break;
                }
              }
            }
          }
          allComment[i]["Like_count"] = isLike.length;
          allComment[i]["isLike"] = isLiker;
        }
      }

      ctx.body = Infos.reqSuc("获取成功", allComment);
    } catch (err) {
      ctx.body = Infos.reqErr("操作失败:" + err);
    }
  };
  addLiker = async (ctx: any) => {
    if (ctx.header == null || ctx.header.authorization == null) {
      ctx.body = Infos.reqErr("操作失败:请先登录");
    }
    let tokenCookie = ctx.header.authorization.split(" ")[1];
    let token = jwt_decode(tokenCookie, "token");

    try {
      const data = await Blogs.addLiker(ctx.request.body.comment_id, token._id);
      if (data.affectedRows) {
        ctx.body = Infos.reqSuc("添加成功");
      } else {
        ctx.body = Infos.reqErr("添加失败");
      }
    } catch (err) {
      ctx.body = Infos.reqErr("操作失败:" + err);
    }
  };
  deleteLiker = async (ctx: any) => {
    let params = ctx.querystring;
    let comment_id = Infos.getParamsQuary("comment_id", params);
    if (ctx.header == null || ctx.header.authorization == null) {
      ctx.body = Infos.reqErr("操作失败:请先登录");
    }
    let tokenCookie = ctx.header.authorization.split(" ")[1];
    let token = jwt_decode(tokenCookie, "token");
    try {
      const data = await Blogs.deleteLiker(comment_id, token._id);
      if (data.affectedRows) {
        ctx.body = Infos.reqSuc("取消成功");
      } else {
        ctx.body = Infos.reqErr("取消失败");
      }
    } catch (err) {
      ctx.body = Infos.reqErr("操作失败:" + err);
    }
  };
}
