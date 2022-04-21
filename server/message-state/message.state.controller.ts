import { Request, Response } from "express";
import ClassCtrl from "../controller/class.controller";
import MsgStateModel from "./message.state.model";

export default class MessageStateCtrl extends ClassCtrl {
  // TODO: implement controller

  /**
   * Liste des statuts
   *
   * @param req
   * @param res
   */
  static recupEtat = (req: Request, res: Response) => {
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
}
