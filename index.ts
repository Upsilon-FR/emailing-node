import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import contact from "./server/contact/contact.routes";
import list from "./server/contact-list/contact.list.routes";
import models from "./server/mysql/models.routes";
import messageState from "./server/message-state/message.state.routes";
import message from "./server/message/message.routes";
import stats from "./server/statistiques/stats.routes";

dotenv.config();

const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 3000;
const app = express();

/**
 * Middlewares
 */
app.use(express.json());
app.use(morgan("dev"));

/**
 * Route initialization
 */
app.use("/contact", contact);
app.use("/list", list);
app.use("/templates", models);
app.use("/status", messageState);
app.use("/message", message);
app.use("/stats", stats);

/**
 * POrt definition
 */
app.listen(PORT, () => {
  console.log(`API listening at ${HOST}:${PORT}`);
});
