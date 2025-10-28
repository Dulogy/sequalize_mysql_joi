import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.db.js";

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "posts",
  timestamps: true
});

export default Post;
