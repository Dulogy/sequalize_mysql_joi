import Sequelize  from "sequelize";

const dbconnection = async () => {
  const sequelize = new Sequelize("world", "root", "Dk07@Team", {
    host: "127.0.0.1",
    port : 3306,
    dialect: "mysql",
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  return sequelize;

};

export default dbconnection;