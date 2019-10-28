import * as mysql from "mysql";

const co_mysql = require("co-mysql");

export const config: any = {
  port: 8080,
  db: {
    database: "blogs",
    user: "root",
    password: "123456",
    host: "127.0.0.1",
    port: "3306",
  },
};

export const sql = co_mysql(mysql.createPool(config.db));
