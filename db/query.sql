SELECT post.id,post.title,post.content,comment.id,comment.text,comment.post_id
FROM post 
LEFT JOIN comment
ON post.id = comment.post_id;

SELECT
  post.id,
  post.title,
  post.content,
  post.user_id AS posted_by_user,
  comment.id AS comment_id,
  comment.text,
  comment.post_id AS belongs_to_post,
  comment.user_id,
  user.id AS userid,
  user.username
FROM post
JOIN comment
  ON post.id = comment.post_id
JOIN user
  ON post.user_id = user.id;