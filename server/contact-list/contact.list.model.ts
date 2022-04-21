import { pool } from "../mysql/db.model";
import ContactList from "./contactList";

export default class ContactListModel {

    queryGetContactList = async (id: Number) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err: any, connexion: any) => {
                // When done with the connection, release it.
                connexion.release();

                if (err) throw err; // not connected!

                const sql = `SELECT c.* FROM contact c
                    JOIN rel_contact-list rcl ON rcl.idContact = c.id
                    WHERE rcl.idList=${id};`;
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

    queryGetList = async (id: Number) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err: any, connexion: any) => {
                // When done with the connection, release it.
                connexion.release();

                if (err) throw err; // not connected!

                const sql = `SELECT * FROM list where id=${id};`;
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
    }

    queryCreateList = async (contactList: ContactList) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err: any, connexion: any) => {
                // When done with the connection, release it.
                connexion.release();

                if (err) throw err; // not connected!

                const sql = `INSERT INTO list (name, description, creationDate) VALUES (${contactList.name} ${contactList.description}, ${contactList.created});`;
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
    }

    queryAddContactToList = async (contact: Number, list: Number) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err: any, connexion: any) => {
                // When done with the connection, release it.
                connexion.release();

                if (err) throw err; // not connected!

                const sql = `INSERT INTO rel_contact-list (idContact, idList, label) VALUES (${contact} ${list}, "");`;
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
    }

    queryRemoveContactFromList = async (contact: Number, list: Number) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err: any, connexion: any) => {
                // When done with the connection, release it.
                connexion.release();

                if (err) throw err; // not connected!

                const sql = `DELETE FROM rel_contact-list WHERE idContact=${contact} AND idList=${list};`;
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
    }

    queryDeleteList = async (id: Number) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err: any, connexion: any) => {
                // When done with the connection, release it.
                connexion.release();

                if (err) throw err; // not connected!

                const sql = `DELETE l, rcl FROM list l
                                JOIN rel_contact-list rcl ON rcl.idList = l.id
                                WHERE l.id = ${id};
                `;
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
    }

}