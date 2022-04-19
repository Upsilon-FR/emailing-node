import { Request, Response } from "express";
import Message from "./message";
import MsgModel from "./message.model";

export default class MessageCtrl {
  // TODO: implement controller

  static fnct = (req: Request, res: Response) => {};

  //récupérer les messages d'un utilisateur
  static msgUser = (req: Request, res: Response) => {};

  //récupérer les messages correspondant à un contact
  static msgContact = (req: Request, res: Response) => {};

  //envoyé un message
  static sendMsg = (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["object", "content", "sendDate", "sendHour"];
      let listError: any[] = [];
      //vérification que le body est correctement rempli
      dataIpt.forEach((val) => {
        if (!Object.keys(req.body).includes(val)) {
          listError.push(`Champ ${val} manquant`);
        }
      });
      Object.entries(req.body).forEach(([key, value]) => {
        if ((!value || value === "") && dataIpt.includes(key)) {
          listError.push(`Champ ${key} vide`);
        } else if ((!value || value === "") && !dataIpt.includes(key)) {
          listError.push(`Champ ${key} non autorisé`);
        } else if (value && !dataIpt.includes(key)) {
          listError.push(`Champ ${key} non autorisé`);
        }
      });

      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      }

      let data: any[] = [];
      for (const [key, value] of Object.entries(req.body)) {
        data.push(value);
      }
      //vérification de l'intégrité de l'objet

      let date: Date = new Date();
      let msg = new Message("Titre", "Content Nicolas", date, date);
      let msgQuery = new MsgModel().queryMessage(msg);
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
  };

  //supprimer un message
  static delMsg = (req: Request, res: Response) => {};
}
