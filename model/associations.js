import User from "./user.model.js";
import Post from "./post.model.js";
import Comment from "./comments.model.js";
import Like from "./likes.model.js";

User.hasMany(Post, {
  foreignKey: "userId",
  as: "posts"
});

Post.belongsTo(User, {
  foreignKey: "userId",
  as: "author"
});

Comment.belongsTo(User,{
  foreignKey : "userId",
  as : "commentedBy"
})
User.hasMany(Comment,{
  foreignKey : "userId",
  as : "userComments"
})

Comment.belongsTo(Post,{
  foreignKey : "postId",
  as : "commentedPost"
})
Post.hasMany(Comment,{
  foreignKey : "postId",
  as : "postComments"
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
  as: 'likedBy' 
});

Like.belongsTo(Post, {
  foreignKey: 'postId',
  as: 'likedPost'
});

User.hasMany(Like, {
  foreignKey: 'userId',
  as: 'userLikes' 
});

Post.hasMany(Like, {
  foreignKey: 'postId',
  as: 'postLikes'
});

export default {
  User,
  Post,
  Comment,
  Like
}