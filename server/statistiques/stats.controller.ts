import { Request, Response } from "express";
import StatsModel from "./stats.model";

export default class StatsCtrl {
  static fnct = (req: Request, res: Response) => {};
  // TODO: implement controller

  //total utilisateurs dont x admin et y user
  static ttlUsers = (req: Request, res: Response) => {};

  //nombre total de contact
  static ttlContact = (req: Request, res: Response) => {};

  //nombre total de list
  static ttlList = (req: Request, res: Response) => {
    let nbListQuery = new StatsModel().queryNbList();
    //Requête SQL
    nbListQuery
      .then((response) => {
        console.log(response);
        res.status(200).send(response);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  };

  //dernier message envoyé (id)
  static lastMsgSent = (req: Request, res: Response) => {};

  //nombre de message envoyé
  static nbMsgSent = (req: Request, res: Response) => {
    let nbMsgQuery = new StatsModel().queryNbMessageSend();
    //Requête SQL
    nbMsgQuery
      .then((response) => {
        console.log(response);
        res.status(200).send(response);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  };

  //nombre de message envoyé selon le type chois
  static nbMsgSentByType = (req: Request, res: Response) => {
    let nbMsgByTypeQuery = new StatsModel().queryNbMessageByType();
    //Requête SQL
    nbMsgByTypeQuery
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
