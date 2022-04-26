import { Request, Response } from "express";
import ClassCtrl from "../controller/class.controller";
import MsgStateModel from "./message.state.model";

export default class MessageStateCtrl extends ClassCtrl {
  /**
   * Création d'un statut
   *
   * @param req
   * @param res
   */
  static createStateMsg = (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["label"];
      let listError = this.verif(dataIpt, req.body);

      //Vérification si des erreurs ont été trouvées précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let stateQuery = new MsgStateModel().queryCreateState(req.body.label);
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
      }
    }
  };

  /**
   * Liste des statuts
   *
   * @param req
   * @param res
   */
  static getState = (req: Request, res: Response) => {
    let stateQuery = new MsgStateModel().queryState();
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
   * Changement du statut d'un message
   *
   * @param req
   * @param res
   */
  static changeStateMsg = (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["id", "label"];
      let listError = this.verif(dataIpt, req.body);

      //Vérification si des erreurs ont été trouvées précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let stateQuery = new MsgStateModel().queryUpdateState(req.body.id, req.body.label);
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
      }
    }
  };

  /**
   * Suppression d'un statut
   *
   * @param req
   * @param res
   */
  static delStateMsg = (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: "Bad request", data: [] });
    } else {
      let dataIpt = ["id"];
      let listError = this.verif(dataIpt, req.body);

      //Vérification si des erreurs ont été trouvées précédement
      if (listError.length > 0) {
        res.status(400).send({ error: true, message: "Erreur", data: [listError] });
      } else {
        let stateQuery = new MsgStateModel().queryDelState(req.body.id);
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
      }
    }
  };
}
