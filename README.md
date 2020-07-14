myBlog 应用是使用 angular7 + koa2 +mysql 开发的

##### 目的

主要为了练习一下 angular 编写及项目引入各插件时的过程，使用 koa2 开发主要为了熟悉一下 ts 及 js 的一些转换语法

##### 主要功能

1. 首页
2. 个人信息
3. 新增博客
4. 查看博客
5.

##### 未完成功能

1. 标签管理
2. ~~头像上传功能~~（已完成）
3. 全局搜索
4. 关注及评论通知
5. 赞数量、文章查看数量、关注数量统计等
6. ……

##### 关键代码

###### 公共插件引入：

- 小狗插件
- 面板娘插接件
- editor.md
- 标签块随机颜色

###### 首页主要功能：

1. 获取登录用户信息（未登录则默认为游客）
2. 获取最新文章列表 （前 5 条）
3. 获取标签列表
4. 获取所有文章列表（每次 10 条，点击加载更多获取下一页数据）
5. 登录
6. 个人信息（查看与编辑）

###### 添加博客

- 标签选择（输入可添加没有的标签）
- MarkDown 格式博客编写

###### 博客查看

- 解析 MarkDown 格式文章
- 加载目录
- 加载评论
- 点赞信息

### 部署

- 执行 `npm run build` 生成 dist 文件夹，将`Dockerfile 与 default.conf` 放入 dist 文件内
- 在 `koa-sever` 文件内执行 tsc 生成后台 dist 文件，将`Dockerfile 与 package.json` 放入 dist 文件内
- 创建 docker-compose.yml 文件 部署 mysql 与 web 与 server
- 在服务器中安装 docker 及 docker-compose
- 在 根目录创建文件夹 blog ，上传 web 的 dist 的文件夹到 blog 内，并改名为 web
- 上传 sever 的 dist 的文件夹到 blog 内，并改名为 service
- 上传 docker-compose.yml 至 blog 文件夹内
- 执行 docker-compose up -d 生成 mysql 及 web、sever 镜像并运行
