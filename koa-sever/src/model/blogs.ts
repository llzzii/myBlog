import { sql } from "../bin/config";
import { Blog, Comment, Tag } from "../entity/index";

export const getTags = () => {
  return sql.query("SELECT * FROM tags ");
};
export const addTags = (tags: Tag) => {
  return sql.query(`INSERT INTO tags SET tag_id='${tags.tag_id}', tag_name = '${tags.tag_name}', tag_alias = '${tags.tag_alias}',
  tag_description='${tags.tag_description}',tag_created_time='${tags.tag_created_time}'`);
};
export const getTag = (tag_name: string) => {
  return sql.query(`SELECT * FROM tags WHERE tag_name='${tag_name}'`);
};
export const addBlogs = (blogs: Blog) => {
  return sql.query(`INSERT INTO blogs SET blog_id='${blogs.blog_id}', user_id = '${blogs.user_id}', blog_title = '${blogs.blog_title}',
  blog_content='${blogs.blog_content}',blog_created_time='${blogs.blog_created_time}',blog_updated_time='${blogs.blog_created_time}'`);
};
export const addBlogAndTag = (info: { blog_id: any; tag_id: any }) => {
  return sql.query(`INSERT INTO blogtags SET blog_id='${info.blog_id}', tag_id = '${info.tag_id}'`);
};

export const getBlogAndTag = (current: number) => {
  return sql.query(`SELECT b.*,GROUP_CONCAT( t.tag_name) tags FROM blogs b LEFT  JOIN blogtags s ON
  b.blog_id = s.blog_id LEFT JOIN tags t on s.tag_id = t.tag_id group by b.blog_id ORDER BY
   b.blog_updated_time DESC LIMIT ${current * 10}, 10`);
};
export const getBlogNews = () => {
  return sql.query(`SELECT * FROM blogs  ORDER BY
     blog_updated_time DESC LIMIT 0, 5`);
};

export const getBlogDetail = (blog_id: string) => {
  return sql.query(`SELECT * FROM blogs WHERE blog_id='${blog_id}' `);
};

export const addComment = (commentInfo: Comment) => {
  return sql.query(`INSERT INTO comments SET comment_id='${commentInfo.comment_id}',
   comment_content = '${commentInfo.comment_content}', comment_like_count = '${commentInfo.comment_like_count}',
   comment_user_id='${commentInfo.comment_user_id}',parent_comment_id='${commentInfo.parent_comment_id}',blog_id='${commentInfo.blog_id}',
   like_user_id='${commentInfo.like_user_id}',
   replied_user_id='${commentInfo.replied_user_id}',comment_created_time="${commentInfo.comment_created_time}"`);
};

export const getComent = (blog_id: string, parent_comment_id: string = "0") => {
  return sql.query(`SELECT * FROM comments WHERE blog_id='${blog_id}' AND  parent_comment_id='${parent_comment_id}'`);
};
export const getComentCount = (blog_id: string) => {
  return sql.query(`SELECT COUNT(*) num FROM comments WHERE blog_id='${blog_id}'`);
};
export const getLiker = (comment_id: string) => {
  return sql.query(`SELECT user_id FROM commentlikeuser WHERE comment_id='${comment_id}'`);
};
export const addLiker = (comment_id: string, user_id: string) => {
  return sql.query(`INSERT IGNORE  INTO commentlikeuser SET comment_id='${comment_id}',
  user_id = '${user_id}'`);
};
export const deleteLiker = (comment_id: string, user_id: string) => {
  return sql.query(`DELETE FROM commentlikeuser WHERE comment_id='${comment_id}'AND
    user_id = '${user_id}'`);
};
