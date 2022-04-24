import { pool } from "../mysql/db.model";
import Message from "./message";

export default class MsgModel {
  /**
   * Requête SQL de création d'un message
   * il sera mis au statut "brouillon"
   *
   * @returns Object
   */
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

  /**
   * Requête SQL d'envoi d'un message
   * il sera mis au statut "envoyé"
   *
   * @returns Object
   */
  querySendMessage = async (id: number) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `UPDATE message SET idState = 4 WHERE id=${id};`;
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible d'envoyer le message", data: [] });
          }
          return resolve({ error: false, message: "Message envoyé", data: [] });
        });
      });
    });
  };

  /**
   * Requête SQL de préparation d'un message
   * il sera mis au statut "prêt à envoyer"
   *
   * @returns Object
   */
  queryPrepareMessage = async (id: number) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `UPDATE message SET idState = 3 WHERE id=${id} AND idState != 3;`;
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de préparer le message pour l'envoie", data: [] });
          }
          return resolve({ error: false, message: "Message prêt à être envoyé", data: [] });
        });
      });
    });
  };

  /**
   * Requête SQL de récupération de l'ensemble des messages
   *
   * @returns Object
   */
  queryGetMessage = async () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `SELECT * FROM message;`;
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

  /**
   * Requête SQL de récupération de l'ensemble des messages prêt à être envoyés
   *
   * @returns Object
   */
  queryGetMessageReady = async () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `SELECT * FROM message WHERE idState = 3;`;
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Aucun message(s) prêt à être envoyé(s)", data: [] });
          }
          return resolve({ error: false, message: "Message récupéré(s)", data: results });
        });
      });
    });
  };

  /**
   * Requête SQL de récupération de l'ensemble des messages d'un contact
   *
   * @returns Object
   */
  queryGetMessageContact = async () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `SELECT * FROM message WHERE idList = (SELECT);`;
        const sqlVerifContact = `SELECT * FROM contact WHERE id = id;`;
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Impossible de récupérer les messages", data: results });
          }
          return resolve({ error: false, message: "Message(s) récupéré(s)", data: results });
        });
      });
    });
  };

  /**
   * Requête SQL de modification d'un message
   *
   * @returns Object
   */
  queryUpdateMessage = async (id: number, msg: Message) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `UPDATE message SET content = "Nouu" WHERE id=${id};`;
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de modifier le message", data: results });
          }
          return resolve({ error: false, message: "Message modifié", data: results });
        });
      });
    });
  };

  /**
   * Requête SQL de suppression d'un message
   *
   * @returns Object
   */
  queryDelMsg = async (id: number) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `DELETE FROM message WHERE id=${id};`;
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de supprimer le message", data: [] });
          }
          return resolve({ error: false, message: "Message supprimé", data: results });
        });
      });
    });
  };
}
