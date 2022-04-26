import { Request, Response } from "express";
import moment from "moment";
import ClassCtrl from "../controller/class.controller";
import Message from "./message";
import MsgModel from "./message.model";

export default class MessageCtrl extends ClassCtrl {
  /**
   * Liste des messages
   *
   * @param req
   * @param res
   */
  static getMessage = (req: Request, res: Response) => {
    let stateQuery = new MsgModel().queryGetMessage();
    //Requête SQL
    stateQuery
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
   * Liste des messages prêt à être envoyés
   *
   * @param req
   * @param res
   */
  static getMessageReady = (req: Request, res: Response) => {
    let stateQuery = new MsgModel().queryGetMessageReady();
    //Requête SQL
    stateQuery
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  };

  /**
   * Récupérer les messages d'un utilisateur
   *
   * @param req
   * @param res
   */
  static msgUser = (req: Request, res: Response) => {
    if (Object.keys(req.params).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["id"];
      let listError = this.verif(dataIpt, req.params);

      //Vérification si des erreurs ont été trouvée précédement
      if (listError.length > 0) {
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

  /**
   * Récupérer les messages d'un contact
   *
   * @param req
   * @param res
   */
  static msgContact = (req: Request, res: Response) => {
    if (Object.keys(req.params).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["id"];
      let listError = this.verif(dataIpt, req.params);

      //Vérification si des erreurs ont été trouvée précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let msgQuery = new MsgModel().queryGetMessageContact();
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

  /**
   * Message brouillon
   *
   * @param req
   * @param res
   */
  static brouillonMsg = (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["idList", "object", "content"];
      let listError = this.verif(dataIpt, req.body);

      //Vérification si des erreurs ont été trouvée précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let date: Date = new Date();
        let formattedDate = moment(date).format("YYYY-MM-DD");
        let formattedTime = moment(date).format("HH:mm:ss");
        let { object, content } = req.body;
        let msg = new Message(object, content, formattedDate, formattedTime);
        if (msg instanceof Message) {
          let msgQuery = new MsgModel().queryMessage(parseInt(req.body.idList), msg);
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

  /**
   * Préparer un message
   *
   * @param req
   * @param res
   */
  static prepareMsg = (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["id"];
      let listError = this.verif(dataIpt, req.body);

      //Vérification si des erreurs ont été trouvée précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let msgQuery = new MsgModel().queryPrepareMessage(parseInt(req.body.id));
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

  /**
   * Envoyer un message
   *
   * @param req
   * @param res
   */
  static sendMsg = (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["id"];
      let listError = this.verif(dataIpt, req.body);

      //Vérification si des erreurs ont été trouvée précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let date: Date = new Date();
        let formattedDate = moment(date).format("YYYY-MM-DD");
        let formattedTime = moment(date).format("HH:mm:ss");
        let msgQuery = new MsgModel().querySendMessage(parseInt(req.body.id), formattedDate, formattedTime);
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

  /**
   * Modifier un message : sont content et/ou object
   *
   * @param req
   * @param res
   */
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
        let msgQuery = new MsgModel().queryUpdateMessage(req.body.id, copyBodyOption);
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

  /**
   * Supprimer un message
   *
   * @param req
   * @param res
   */
  static delMsg = (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["id"];
      let listError = this.verif(dataIpt, req.body);

      //Vérification si des erreurs ont été trouvée précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let msgDelQuery = new MsgModel().queryDelMsg(req.body.id);
        //Requête SQL
        msgDelQuery
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
