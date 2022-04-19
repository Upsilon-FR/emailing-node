import { pool } from "../mysql/db.model";

export default class UserModel {
  queryUser = async (array: Array<any>) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = "SELECT";
        pool.query(sql, array, (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }
          if (!results[0]) {
            return reject({ error: true, message: "Utilisateur introuvable", data: results });
          }
          return resolve({ error: false, message: "Connexion réussi", data: results });
        });
      });
    });
  };
}
