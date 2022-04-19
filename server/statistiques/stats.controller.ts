import { Request, Response } from "express";

export default class StatsCtrl {
  static fnct = (req: Request, res: Response) => {};
  // TODO: implement controller

  //total utilisateurs dont x admin et y user
  static ttlUsers = (req: Request, res: Response) => {};

  //nombre total de contact
  static ttlContact = (req: Request, res: Response) => {};

  //nombre total de list
  static ttlList = (req: Request, res: Response) => {};

  //dernier message envoyé (id)
  static lastMsgSent = (req: Request, res: Response) => {};

  //nombre de message envoyé
  static nbMsgSent = (req: Request, res: Response) => {};

  //nombre de message envoyé selon le type chois
  static nbMsgSentByType = (req: Request, res: Response) => {};
}
