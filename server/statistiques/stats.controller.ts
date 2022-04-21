import { Request, Response } from "express";
import StatsModel from "./stats.model";

export default class StatsCtrl {
  // TODO: implement controller

  /**
   * Nombre total utilisateurs dont x admin et y user
   *
   * @param req
   * @param res
   */
  static ttlUsers = (req: Request, res: Response) => {
    let ttlUsersQuery = new StatsModel().queryNbUsers();
    //Requête SQL
    ttlUsersQuery
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
   * Nombre total de contact
   *
   * @param req
   * @param res
   */
  static ttlContact = (req: Request, res: Response) => {
    let ttlContactQuery = new StatsModel().queryNbContact();
    //Requête SQL
    ttlContactQuery
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
   * Nombre total de list
   *
   * @param req
   * @param res
   */
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

  /**
   * Nombre de message envoyé
   *
   * @param req
   * @param res
   */
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

  /**
   * Nombre de message envoyé selon le type choisi
   *
   * @param req
   * @param res
   */
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

  /**
   * Dernier message envoyé (id)
   *
   *
   * @param req
   * @param res
   */
  static lastMsgSent = (req: Request, res: Response) => {
    let lastMsgQuery = new StatsModel().queryLastMessage();
    //Requête SQL
    lastMsgQuery
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
