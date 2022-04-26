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
import authToken from "./server/middleware/auth";
import Authentication from "./server/auth/auth";

dotenv.config();

const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 3000;
const app = express();

/**
 * Middlewares
 */
app.use(express.json());
app.use(morgan("dev"));
app.use(authToken);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(docs));

/**
 * Route initialization
 */
app.use("/contact", contact);
app.use("/list", list);
app.use("/statut", messageState);
app.use("/message", message);
app.use("/stats", stats);

const apiUrlMsgReady = `${HOST}:${PORT}/message/list/ready`;

cron.schedule("* * * * *", () => {
  console.log("Récupération des messages prêt à envoyer en cours...");
  try {
    axios({
      method: "get",
      url: apiUrlMsgReady,
    })
      .then((response) => {
        if (response.data.data.length > 0) {
          console.log("\x1b[36m%s\x1b[0m", `${response.data.data.length} message(s) prêt à être envoyé(s)`);
          console.log("\x1b[36m%s\x1b[0m", `Message(s) en cours d'envoi(s)...`);

          setTimeout(() => {
            const authData = {
              job: "cron",
              description: "Send message",
            };
            const token = Authentication.auth(authData);
            response.data.data.forEach((el: { id: any }) => {
              axios({
                method: "patch",
                url: `${HOST}:${PORT}/message/send`,
                data: {
                  id: parseInt(el.id),
                },
                headers: {
                  Authorization: "Bearer " + token,
                },
              }).then((response) => {
                console.log("\x1b[36m%s\x1b[0m", `Message envoyé`);
              });
            });
          }, 10000);
        }
      })
      .catch((err) => {
        console.log("\x1b[33m%s\x1b[0m", err.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
});

/**
 * Port definition
 */
app.listen(PORT, () => {
  console.log("\x1b[43m%s\x1b[0m", `API listening at ${HOST}:${PORT}`);
});
