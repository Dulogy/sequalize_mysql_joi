import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.db.js";

const Comment = sequelize.define("Comment",{
  id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  userId : {
    type : DataTypes.INTEGER
  },
  postId : {
    type : DataTypes.INTEGER
  },
  comment : {
    type : DataTypes.STRING,
    allowNull : false
  }
},{
  tableName : "comments",
  timestamps : true,
})

export default Comment;