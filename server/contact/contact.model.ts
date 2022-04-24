import { pool } from "../mysql/db.model";
import Contact from "./contact";

export default class ContactModel {
  queryGetContact = async (id: Number) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `SELECT * FROM contact where id=${id};`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Impossible de récupérer le contact", data: results });
          }
          return resolve({ error: false, message: "Contact récupéré(s)", data: results[0] });
        });
      });
    });
  };

  queryAddContact = async (contact: Contact) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `INSERT INTO contact (firstname, lastname, mail, creationDate) VALUES (${contact.firstName}, ${contact.lastName}, ${contact.email}, ${contact.creationDate});`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Impossible de récupérer le contact", data: results });
          }
          return resolve({ error: false, message: "Contact récupéré(s)", data: results });
        });
      });
    });
  };

  queryDelContact = async (id: Number) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `DELETE FROM contact where id=${id};`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Impossible de supprimer le contact", data: results });
          }
          return resolve({ error: false, message: "Contact supprimé", data: results });
        });
      });
    });
  };

  queryUpdateName = async (id: Number, firstName: string, lastName: string) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `UPDATE contact SET lastname = ${lastName} AND firstname = ${firstName} WHERE id=${id};`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Impossible de récupérer le contact", data: results });
          }
          return resolve({ error: false, message: "Contact récupéré(s)", data: results });
        });
      });
    });
  };

  queryUpdateEmail = async (id: Number, email: string) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `UPDATE contact SET mail = ${email} WHERE id=${id};`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Impossible de récupérer le contact", data: results });
          }
          return resolve({ error: false, message: "Contact récupéré(s)", data: results });
        });
      });
    });
  };

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
            return reject({ error: true, message: "Impossible de récupérer les contacts", data: results });
          }
          return resolve({ error: false, message: "Contact(s) récupéré(s)", data: results });
        });
      });
    });
  };
}
