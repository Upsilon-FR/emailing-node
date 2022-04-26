import { pool } from "../mysql/db.model";

export default class MsgStateModel {
  /**
   * Requête SQL de création d'un statut
   *
   * @returns Object
   */
  queryCreateState = async (label: string) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `INSERT INTO state (label) VALUES (${label});`;
        const sqlVerif = `SELECT * FROM state WHERE label LIKE '${label}'`;
        pool.query(sqlVerif, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            pool.query(sql, [], (error, results) => {
              if (results.affectedRows === 0) {
                return reject({ error: true, message: "Impossible de créer le statut", data: [] });
              }
              return resolve({ error: false, message: "Statut créé", data: [] });
            });
          }
          return reject({ error: true, message: "Impossible de créer le statut : statut déjà existant", data: [] });
        });
      });
    });
  };

  /**
   * Requête SQL de récupération des statuts
   *
   * @returns Object
   */
  queryState = async () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = "SELECT label FROM state";
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de récupérer les statuts", data: [] });
          }
          return resolve({ error: false, message: "Statuts récupérés", data: results });
        });
      });
    });
  };

  /**
   * Requête SQL de récupération d'un statut'
   *
   * @returns Object
   */
  queryGetOneState = async (label: string) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `SELECT * FROM state WHERE label LIKE '${label}'`;
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de récupérer le statut", data: [] });
          }
          return resolve({ error: false, message: "Statut récupéré", data: results });
        });
      });
    });
  };

  /**
   * Requête SQL de modification d'un statut
   *
   * @returns Object
   */
  queryUpdateState = async (id: number, label: string) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `UPDATE state SET label = '${label}' WHERE id=${id};`;
        const sqlVerifLabel = `SELECT * FROM state WHERE label LIKE '${label}'`;
        const sqlVerifId = `SELECT * FROM state WHERE id LIKE ${id}`;
        pool.query(sqlVerifId, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Impossible de modifier le statut : statut inexistant", data: [] });
          } else {
            pool.query(sqlVerifLabel, [], (error, results2) => {
              if (results2[0]) {
                return reject({ error: true, message: "Modification du statut annulée : label identique", data: [] });
              }

              pool.query(sql, [], (error, results3) => {
                if (results3.affectedRows === 0) {
                  return reject({ error: true, message: error, data: [] });
                }
                return resolve({ error: false, message: "Statut modifié", data: [] });
              });
            });
          }
        });
      });
    });
  };

  /**
   * Requête SQL de suppression d'un statut
   *
   * @returns Object
   */
  queryDelState = async (id: number) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `DELETE FROM state WHERE id=${id};`;
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Statut inexistant", data: [] });
          }
          return resolve({ error: false, message: "Statut supprimé", data: results });
        });
      });
    });
  };
}
