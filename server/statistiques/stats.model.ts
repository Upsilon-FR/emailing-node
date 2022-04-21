import { pool } from "../mysql/db.model";

export default class StatsModel {
  /**
   * Requête SQL de récupération du nombre d'utilisateur regroupés par type (admin ou user)
   *
   * @returns Object
   */
  queryNbUsers = async () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = "SELECT count(*) as nbUsers, u.typeCompte FROM user as u GROUP BY u.typeCompte;";
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de récupérer le nombre d'utilisateurs", data: results });
          }
          return resolve({ error: false, message: "Nombre d'utilisateurs récupéré", data: results });
        });
      });
    });
  };

  /**
   * Requête SQL de récupération du nombre de contact
   *
   * @returns Object
   */
  queryNbContact = async () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = "SELECT count(*) as nbList FROM contact;";
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

  /**
   * Requête SQL de récupération du nombre de list
   *
   * @returns Object
   */
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

  /**
   * Requête SQL de récupération du nombre de messages envoyés
   *
   * @returns Object
   */
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

  /**
   * Requête SQL de récupération du nombre de messages triés par type
   *
   * @returns Object
   */
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

  /**
   * Requête SQL de récupération de l'ID du dernier message
   *
   * @returns Object
   */
  queryLastMessage = async () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = "SELECT LAST_INSERT_ID() as idDernierMessage FROM message LIMIT 1;";
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de récupérer le dernier message", data: results });
          }
          return resolve({ error: false, message: "Message récupéré", data: results });
        });
      });
    });
  };
}
