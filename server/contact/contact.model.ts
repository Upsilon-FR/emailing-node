import { pool } from "../mysql/db.model";
import Contact from "./contact";

export default class ContactModel {
  /**
   * Requête SQL de récupération de l'ensemble des contacts
   *
   * @returns Object
   */
  queryGetAll = async () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `SELECT * FROM contact`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Aucun contacts trouvés", data: [] });
          }
          return resolve({ error: false, message: "Contact(s) récupéré(s)", data: results });
        });
      });
    });
  };

  /**
   * Requête SQL de récupération d'un contact en particulier
   *
   * @returns Object
   */
  queryGetContact = async (id: Number) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `SELECT * FROM contact WHERE id=${id};`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Contact introuvable", data: [] });
          }
          return resolve({ error: false, message: "Contact récupéré", data: results[0] });
        });
      });
    });
  };

  /**
   * Requête SQL de création de contact
   *
   * @returns Object
   */
  queryAddContact = async (contact: Contact) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `INSERT INTO contact (name, firstname, lastname, mail, creationDate) VALUES ('${contact.name}','${contact.firstname}', '${contact.lastname}', '${contact.mail}', '${contact.firstname}');`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de créer le contact", data: [] });
          }
          return resolve({ error: false, message: "Contact créé", data: [] });
        });
      });
    });
  };

  /**
   * Requête SQL de modification d'un contact
   *
   * @returns Object
   */
  queryUpdate = async (id: Number, data: any = {}) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
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

        const sql = `UPDATE contact SET ${strgData} WHERE id=${id};`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Contact introuvable", data: [] });
          }
          return resolve({ error: false, message: "Contact modifié", data: [] });
        });
      });
    });
  };

  /**
   * Requête SQL de suppression d'un contact
   *
   * @returns Object
   */
  queryDelContact = async (id: Number) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `DELETE FROM contact WHERE id=${id};`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Contact introuvable", data: [] });
          }
          return resolve({ error: false, message: "Contact supprimé", data: [] });
        });
      });
    });
  };
}
