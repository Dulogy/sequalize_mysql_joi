import 'dotenv/config'
import express from "express";
import { dbconnection, sequelize } from "./config/mysql.db.js";
import router from "./routes/index.js";
const app = express();

app.use("/",router);
const port = process.env.PORT;

app.listen(port,async (err) => {
  if(err){
    console.log("error");
  }
  console.log("server is running at port",port);
  await dbconnection();
  await sequelize.sync();
})

