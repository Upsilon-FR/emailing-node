import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cron from "node-cron";
import axios from "axios";
import swaggerUI from "swagger-ui-express";
import contact from "./server/contact/contact.routes";
import list from "./server/contact-list/contact.list.routes";
import messageState from "./server/message-state/message.state.routes";
import message from "./server/message/message.routes";
import stats from "./server/statistiques/stats.routes";
import docs from "./docs/index";

dotenv.config();

const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 3000;
const app = express();

/**
 * Middlewares
 */
app.use(express.json());
app.use(morgan("dev"));
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(docs));

/**
 * Route initialization
 */
app.use("/contact", contact);
app.use("/list", list);
app.use("/statut", messageState);
app.use("/message", message);
app.use("/stats", stats);

cron.schedule("* * * * *", function () {
  console.log("Récupération des messages en cours...");
  axios({
    method: "get",
    url: `${HOST}:${PORT}/message/list/ready`,
  }).then((response) => {
    if (response.data.data.length > 0) {
      console.log(`${response.data.data.length} message(s) prêt à être envoyé(s)`);

      setTimeout(() => {
        console.log("Hello");
      }, 1000);
    }
  });
});

/**
 * Port definition
 */
app.listen(PORT, () => {
  console.log(`API listening at ${HOST}:${PORT}`);
});
