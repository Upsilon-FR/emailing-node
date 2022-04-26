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

        const sql = `INSERT INTO message (object, content, sendDate, sendHour, idState, idList) VALUES ('${msg.object}',  '${msg.content}' , '${msg.sendDate}' , '${msg.sendHour}' , ${msg.state} , 1);`;
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de créer le message", data: {} });
          }
          return resolve({ error: false, message: "Message crée", data: [] });
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
  querySendMessage = async (id: number, date: string, hour: string) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `UPDATE message SET idState = 4, sentDate = '${date}', sentHour = '${hour}' WHERE id=${id};`;
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
  queryUpdateMessage = async (id: number, data: any = {}) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connexion) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        let strgData = "";
        let lenData = Object.keys(data).length;
        let cpt = 1;

        Object.keys(data).forEach((k) => {
          strgData += `${k} = '${data[k]}'`;
          if (cpt < lenData) {
            strgData += ", ";
            cpt++;
          }
        });

        const sql = `UPDATE message SET ${strgData} WHERE id=${id};`;
        pool.query(sql, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de modifier le message", data: [] });
          }
          return resolve({ error: false, message: "Message modifié", data: [] });
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
          return resolve({ error: false, message: "Message supprimé", data: [] });
        });
      });
    });
  };
}
