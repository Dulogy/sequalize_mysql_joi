import express from "express";
import dbconnection from "./config/mysql.db.js";
const app = express();

const port = 3000;
app.listen(port,(err) => {
  if(err){
    console.log("error");
  }
  console.log("server is running at port",port);
  dbconnection();
})