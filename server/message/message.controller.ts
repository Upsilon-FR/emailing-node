import { Request, Response } from "express";
import ClassCtrl from "../controller/class.controller";
import Message from "./message";
import MsgModel from "./message.model";

export default class MessageCtrl extends ClassCtrl {
  // TODO: implement controller

  static fnct = (req: Request, res: Response) => {};

  //Récupérer les messages d'un utilisateur
  static msgUser = (req: Request, res: Response) => {
    if (Object.keys(req.params).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["id"];
      let listError = this.verif(dataIpt, req.params);

      //Vérification si des erreurs ont été trouvée précédement
      if (this.verif(dataIpt, req.params).length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        //let date: Date = new Date();
        //let msg = new Message("Titre", "Content Nicolas", date, date);
        let msgQuery = new MsgModel().queryGetMessage();
        //Requête SQL
        msgQuery
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

  //Récupérer les messages correspondant à un contact
  static msgContact = (req: Request, res: Response) => {};

  //Envoyer un message
  static sendMsg = (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["object", "content", "sendDate", "sendHour"];
      let listError = this.verif(dataIpt, req.body);

      //Vérification si des erreurs ont été trouvée précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let date: Date = new Date();
        let { object, content } = req.body;
        let msg = new Message(object, content, date, date);
        console.log(typeof object);
        console.log(typeof content);
        console.log(typeof msg.content);
        if (msg instanceof Message) {
          let msgQuery = new MsgModel().queryMessage(msg);
          //Requête SQL
          msgQuery
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

  //supprimer un message
  static delMsg = (req: Request, res: Response) => {};
}
