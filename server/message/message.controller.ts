import { Request, Response } from "express";
import ClassCtrl from "../controller/class.controller";
import { State } from "../message-state/interface.state";
import MessageStateCtrl from "../message-state/message.state.controller";
import Message from "./message";
import MsgModel from "./message.model";

export default class MessageCtrl extends ClassCtrl {
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

  //Message brouillon
  static brouillonMsg = (req: Request, res: Response) => {
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

        if (msg instanceof Message) {
          if (msg.state === State.BROU) {
            msg.send();
          }
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

  //Modifier un message, sont content et/ou object
  static changeMsg = (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["id"];
      let dataIptOption = ["object", "content"];
      let copyBody = req.body;
      let copyBodyOption: any = { object: "", content: "" };
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

      let listError = this.verif(dataIpt, copyBody);
      let listErrorOption = this.verifWithOption(dataIptOption, copyBodyOption, true);
      listErrorOption.forEach((val) => {
        listError.push(val);
      });

      //Vérification si des erreurs ont été trouvée précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let date: Date = new Date();
        let { object, content } = req.body;
        let msg = new Message(object, content, date, date);
        if (msg instanceof Message) {
          if (msg.state === State.BROU) {
            msg.send();
          }
          let msgQuery = new MsgModel().queryUpdateMessage(req.body.id, msg);
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
