import { pool } from "../mysql/db.model";

export default class StatsModel {
  queryNbList = async () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = "SELECT count(*) as nbList FROM list;";
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de récupérer le nombre de message", data: results });
          }
          return resolve({ error: false, message: "Messages récupéré", data: results });
        });
      });
    });
  };

  queryNbMessageSend = async () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = "SELECT count(*) as nbMessage FROM message;";
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de récupérer le nombre de message", data: results });
          }
          return resolve({ error: false, message: "Messages récupéré", data: results });
        });
      });
    });
  };

  queryNbMessageByType = async () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = "SELECT count(*) as nbMessage, s.label FROM message as m INNER JOIN state as s ON m.idState = s.id GROUP BY m.idState;";
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de récupérer le nombre de message", data: results });
          }
          return resolve({ error: false, message: "Messages récupéré", data: results });
        });
      });
    });
  };
}
