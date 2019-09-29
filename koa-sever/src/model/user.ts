import { sql } from "../bin/config";
import { User } from "../entity/index";

export const login = (user_name: string) => {
  return sql.query(`SELECT * FROM users WHERE user_name='${user_name}'`);
};
export const getUser = (user_name: string) => {
  return sql.query(
    `SELECT user_name,user_sex,user_telephone,user_imgurl,user_nickname,user_birthday,user_declaration
     FROM users WHERE user_name='${user_name}'`
  );
};
export const createUser = (userinfo: User) => {
  return sql.query(
    `INSERT INTO users SET user_id='${userinfo.user_id}', user_name = '${userinfo.user_name}', user_password = '${userinfo.user_password}'
    ,user_role='${userinfo.user_role}',
    user_declaration='${userinfo.user_declaration}',
    user_sex='${userinfo.user_sex}',
    user_telephone='${userinfo.user_telephone}',
    user_imgurl='${userinfo.user_imgurl}',user_ip='${userinfo.user_ip}',
    user_nickname='${userinfo.user_nickname}',user_email='${userinfo.user_email}',
    user_created_time='${userinfo.user_created_time}',user_birthday='${userinfo.user_birthday}',
    user_updated_time='${userinfo.user_created_time}'`
  );
};

export const updateUser = (userinfo: User) => {
  return sql.query(
    `UPDATE users  SET user_declaration='${userinfo.user_declaration}',
    user_sex='${userinfo.user_sex}',
    user_telephone='${userinfo.user_telephone}',
    user_imgurl='${userinfo.user_imgurl}',user_ip='${userinfo.user_ip}',
    user_nickname='${userinfo.user_nickname}',user_email='${userinfo.user_email}',
   user_birthday='${userinfo.user_birthday}',
    user_updated_time='${userinfo.user_created_time}' WHERE user_name=${userinfo.user_name}`
  );
};
