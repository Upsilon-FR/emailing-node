import { pool } from "../mysql/db.model";

export default class MsgStateModel {
  queryState = async () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = "SELECT * FROM state";
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de récupérer les états", data: results });
          }
          return resolve({ error: false, message: "États récupérés", data: results });
        });
      });
    });
  };
}
