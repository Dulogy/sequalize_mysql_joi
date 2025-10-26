import { DataTypes} from "sequelize";
import { sequelize } from "../config/mysql.db.js";

const User = sequelize.define('User',{
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      defaultValue : "Kumar"
    },
    email : {
      type : DataTypes.STRING,
      allowNull : false
    },
    password : {
      type : DataTypes.STRING,
      allowNull : false
    }
  },
  {
    // Other model options go here
    //freezeTableName : true // model == db table same
    tableName : "users",
    timestamps : true,
  },
);

export default User ;