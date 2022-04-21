import { Request, Response } from "express";
import ContactModel from "./contact.model";
import ClassCtrl from "../controller/class.controller";
import Contact from "./contact";

export default class ContactCtrl extends ClassCtrl {

  static getContact = (req: Request, res: Response) => {
    const contactId = req.params.id ?? null;

    let success = true;
    let error = null;
    let code = 200;

    if(success) {
      let query = new ContactModel().queryGetContact(parseInt(contactId));
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
  };

  static addContact = (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["firstName", "lastName", "email"];
      let listError = this.verif(dataIpt, req.body);

      //Vérification si des erreurs ont été trouvée précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let date: Date = new Date();
        let { firstName, lastName, email} = req.body;
        let contact = new Contact(firstName, lastName, email, date);
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
  }

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
  }
}
