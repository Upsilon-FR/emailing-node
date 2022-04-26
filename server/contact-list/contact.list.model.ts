import { pool } from "../mysql/db.model";
import ContactList from "./contactList";

export default class ContactListModel {
  queryGetContactList = async (id: Number) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err: any, connexion: any) => {
        // When done with the connection, release it.
        connexion.release();

        if (err) throw err; // not connected!

        const sql = `SELECT c.* FROM contact as c INNER JOIN \`rel_contact-list\` as rcl ON rcl.idContact = c.id WHERE rcl.idList=${id};`;
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

        const sql = `INSERT INTO list (name, description, creationDate) VALUES ('${contactList.name}', '${contactList.description}', '${contactList.created}');`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de créer la list", data: results });
          }
          return resolve({ error: false, message: "Liste créée", data: [] });
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

        const sqlVerif = `SELECT * FROM list WHERE id = ${list}`;
        const sql = `INSERT INTO \`rel_contact-list\` (idContact, idList, label) VALUES (${contact}, ${list}, 'test');`;
        pool.query(sqlVerif, [], (error, results) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }
          console.log(results);
          console.log(results.length > 0);

          if (results.length > 0) {
            pool.query(sql, [], (error, results) => {
              if (!results || results.affectedRows === 0) {
                return reject({ error: true, message: "Impossible d'ajouter le contact à la liste", data: [] });
              }
              return resolve({ error: false, message: "Contact ajouté à la liste", data: [] });
            });
          } else {
            return reject({ error: true, message: "Liste inconnue", data: [] });
          }
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

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de retirer le contact de la liste", data: [] });
          }
          return resolve({ error: false, message: "Contact retiré de la liste", data: [] });
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

        const sql = `DELETE FROM list WHERE id = ${id};`;
        pool.query(sql, [], (error: any, results: any) => {
          if (error) {
            return reject({ error: true, message: error, data: [] });
          }

          if (results.affectedRows === 0) {
            return reject({ error: true, message: "Impossible de supprimer la liste de contact", data: [] });
          }
          return resolve({ error: false, message: "Liste supprimée", data: [] });
        });
      });
    });
  };
}
