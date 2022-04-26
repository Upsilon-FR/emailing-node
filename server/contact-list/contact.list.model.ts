import { pool } from "../mysql/db.model";
import ContactList from "./contactList";

export default class ContactListModel {
  queryGetContactList = async (id: Number) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `SELECT c.* FROM contact as c JOIN \`rel_contact-list\` as rcl ON rcl.idContact = c.id WHERE rcl.idList=${id};`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Aucun contact dans cette liste", data: results });
          }
          return resolve({ error: false, message: "Contact(s) de la liste récupéré(s)", data: results });
        });
      });
    });
  };

  queryGetList = async (id: Number) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `SELECT * FROM list WHERE id=${id};`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Impossible de récupérer la liste", data: results });
          }
          return resolve({ error: false, message: "Contact récupéré(s)", data: results[0] });
        });
      });
    });
  };

  queryCreateList = async (contactList: ContactList) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `INSERT INTO list (name, description, creationDate) VALUES ('${contactList.name}', '${contactList.description}', '23-02-2022');`;
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

  queryAddContactToList = async (contact: Number, list: Number) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `INSERT INTO \`rel_contact-list\` (idContact, idList, label) VALUES (${contact}, ${list}, 'test');`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Impossible d'ajouter le contact", data: results });
          }
          return resolve({ error: false, message: "Contact ajouté à la liste", data: results });
        });
      });
    });
  };

  queryRemoveContactFromList = async (contact: Number, list: Number) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `DELETE FROM \`rel_contact-list\` WHERE idContact=${contact} AND idList=${list};`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Impossible de retirer le contact de la liste", data: results });
          }
          return resolve({ error: false, message: "Contact retiré de la list", data: results });
        });
      });
    });
  };

  queryDeleteList = async (id: Number) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `DELETE l, rcl FROM list as l JOIN \`rel_contact-list\` as rcl ON rcl.idList = l.id WHERE l.id = ${id}; `;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (!results[0]) {
            return reject({ error: true, message: "Impossible de supprimer la liste de contact", data: results });
          }
          return resolve({ error: false, message: "Liste supprimée", data: results });
        });
      });
    });
  };
}
