import { Request, Response } from "express";

export default class MessageCtrl {
  // TODO: implement controller

  static fnct = (req: Request, res: Response) => {};

  //récupérer les messages d'un utilisateur
  static msgUser = (req: Request, res: Response) => {};

  //récupérer les messages correspondant à un contact
  static msgContact = (req: Request, res: Response) => {};

  //envoyé un message
  static sendMsg = (req: Request, res: Response) => {};

  //supprimer un message
  static delMsg = (req: Request, res: Response) => {};
}
