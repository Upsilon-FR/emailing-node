import { Request, Response } from "express";
import ContactModel from "./contact.model";
import ClassCtrl from "../controller/class.controller";
import Contact from "./contact";
import moment from "moment";

export default class ContactCtrl extends ClassCtrl {
  /**
   * Récupérer l'ensemble des contacts
   *
   * @param req
   * @param res
   */
  static getAll = (req: Request, res: Response) => {
    let query = new ContactModel().queryGetAll();
    //Requête SQL
    query
      .then((response) => {
        console.log(response);
        res.status(200).send(response);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  };

  /**
   * Récupérer un contact en détail
   *
   * @param req
   * @param res
   */
  static getContact = (req: Request, res: Response) => {
    if (Object.keys(req.params).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["id"];
      let listError = this.verif(dataIpt, req.params);

      //Vérification si des erreurs ont été trouvée précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let query = new ContactModel().queryGetContact(parseInt(req.params.id));
        query
          .then((response) => {
            console.log(response);
            res.status(200).send(response);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      }
    }
  };

  /**
   * Ajouter un contact
   *
   * @param req
   * @param res
   */
  static addContact = (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["name", "firstname", "lastname", "mail"];
      let listError = this.verif(dataIpt, req.body);

      //Vérification si des erreurs ont été trouvée précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let date: Date = new Date();
        let formattedDate = moment(date).format("YYYY-MM-DD");
        let { name, firstname, lastname, mail } = req.body;
        let contact = new Contact(name, firstname, lastname, mail, formattedDate);

        if (contact instanceof Contact) {
          let query = new ContactModel().queryAddContact(contact);
          //Requête SQL
          query
            .then((response) => {
              console.log(response);
              res.status(200).send(response);
            })
            .catch((error) => {
              console.log(error);
              res.status(400).send(error);
            });
        } else {
          res.status(400).send({ error: true, message: "Les données sont incorrectes", data: [] });
        }
      }
    }
  };

  /**
   * Modifier un contact: sont nom, prénom et/ou email
   *
   * @param req
   * @param res
   */
  static updateContact = (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt1 = ["id"];
      let dataIptOption = ["firstname", "lastname", "mail"];
      let copyBody = req.body;
      let copyBodyOption: any = { firstname: "", lastname: "", mail: "" };
      let dataOptionToDel: string[] = [];

      //Adaptation des deux objets selon les données reçues
      Object.keys(copyBody).forEach((k) => {
        if (dataIptOption.includes(k)) {
          dataOptionToDel.push(k);
          copyBodyOption[k] = copyBody[k];
          delete copyBody[k];
        }
      });

      //Supppression des options à ne pas prendre en compte
      dataIptOption.forEach((k) => {
        if (!dataOptionToDel.includes(k)) {
          delete copyBodyOption[k];
        }
      });

      let listError = this.verif(dataIpt1, copyBody);
      let listErrorOption = this.verifWithOption(dataIptOption, copyBodyOption, true);
      listErrorOption.forEach((val) => {
        listError.push(val);
      });

      //Vérification si des erreurs ont été trouvée précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let query = new ContactModel().queryUpdate(parseInt(req.body.id), copyBodyOption);
        //Requête SQL
        query
          .then((response) => {
            console.log(response);
            res.status(200).send(response);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      }
    }
  };

  /**
   * Supprimer un contact
   *
   * @param req
   * @param res
   */
  static delContact = (req: Request, res: Response) => {
    if (Object.keys(req.params).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["id"];
      let listError = this.verif(dataIpt, req.params);

      //Vérification si des erreurs ont été trouvée précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let { id } = req.params;
        let query = new ContactModel().queryDelContact(parseInt(id));
        //Requête SQL
        query
          .then((response) => {
            console.log(response);
            res.status(200).send(response);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      }
    }
  };
}
