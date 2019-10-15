export class User {
  user_id = "";
  user_name = "";
  user_password = "";
  user_role = "";
  user_sex = "";
  user_imgurl = "";
  user_ip = "";
  user_nickname = "";
  user_email = "";
  user_created_time = "";
  user_updated_time = "";
  user_birthday = "";
  user_telephone = "";
  checkPassword = "";
  user_declaration = "";
}
export class Tag {
  tag_id = "";
  tag_name = "";
  tag_alias = "";
  tag_created_time = "";
  tag_description = "";
}
export class Blog {
  blog_id = "";
  user_id = "";
  blog_title = "";
  blog_content = "";
  blog_views = "";
  blog_comment_count = "";
  blog_like_count = "";
  blog_created_time = "";
  blog_updated_time = "";
  tags: any;
}
export class Comment {
  blog_id = "";
  comment_user_id = "";
  replied_user_id = "";
  comment_id = "";
  comment_content = "";
  comment_like_count = "";
  comment_created_time = "";
  parent_comment_id = "";
  like_user_id = "";
}
