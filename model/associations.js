import RoleMaster from "./role.model.js";
import User from "./user.model.js";
import Post from "./post.model.js";
import Comment from "./comments.model.js";

User.hasMany(Post, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "posts"
});

Post.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
  as: "author"
});

Comment.belongsTo(User,{
  foreignKey : "userId",
  sourceKey : "id",
  as : "comments"
})
User.hasMany(Comment,{
  foreignKey : "userId",
  sourceKey : "id",
  as : "comments"
})

Comment.belongsTo(Post,{
  foreignKey : "postId",
  sourceKey : "id",
  as : "commentedPost"
})
Post.hasMany(Comment,{
  foreignKey : "postId",
  sourceKey : "id",
  as : "postcomments"
})

// USER ↔ POST through LIKE (M:N)
User.belongsToMany(Post, {
  through: Like,
  foreignKey: 'userId',
  otherKey: 'postId',
  as: 'likedPosts'
});

Post.belongsToMany(User, {
  through: Like,
  foreignKey: 'postId',
  otherKey: 'userId',
  as: 'postLikers'
});

// Reverse (direct) relations for Like table
Like.belongsTo(User, {
  foreignKey: 'userId',
  sourceKey :"id",
  as: 'likedBy' 
});

Like.belongsTo(Post, {
  foreignKey: 'postId',
  sourceKey : "id",
  as: 'likedPost'
});

User.hasMany(Like, {
  foreignKey: 'userId',
  sourceKey : "id",
  as: 'userLikes' 
});

Post.hasMany(Like, {
  foreignKey: 'postId',
  sourceKey : "id",
  as: 'postLikes'
});

export {
  RoleMaster,
  User,
  Post,
  Comment,
  Like
}