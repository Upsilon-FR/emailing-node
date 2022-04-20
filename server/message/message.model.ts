import { pool } from "../mysql/db.model";
import Message from "./message";

export default class MsgModel {
  queryMessage = async (msg: Message) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `INSERT INTO message (object, content, sendDate, sendHour, idState, idList) VALUES ('${msg.object}',  '${msg.content}' , '2022-04-03', '23:59:59' , ${msg.state} , 1);`;
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible d'envoyer le message", data: results });
          }
          return resolve({ error: false, message: "Message envoyé", data: results });
        });
      });
    });
  };

  queryGetMessage = async () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = "SELECT * FROM message;";
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Impossible de récupérer les messages", data: results });
          }
          return resolve({ error: false, message: "Message récupéré(s)", data: results });
        });
      });
    });
  };
}
