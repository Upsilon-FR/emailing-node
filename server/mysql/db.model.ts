import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: process.env.HOSTMYSQL || "",
  user: process.env.USERMYSQL || "",
  password: process.env.PASSWORDMYSQL || "",
  database: process.env.DATABASE || "",
  port: 3306,
};
const pool = mysql.createPool(config);

export { pool };
