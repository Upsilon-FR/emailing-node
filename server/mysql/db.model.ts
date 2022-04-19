import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "upsl-msg",
  port: 3306,
};
const pool = mysql.createPool(config);

export { pool };
