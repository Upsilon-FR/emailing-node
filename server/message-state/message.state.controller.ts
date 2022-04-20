import { Request, Response } from "express";
import ClassCtrl from "../controller/class.controller";
import MsgStateModel from "./message.state.model";

export default class MessageStateCtrl extends ClassCtrl {
  // TODO: implement controller
  static recupEtat = () => {
    let stateQuery = new MsgStateModel().queryState();
    //Requête SQL
    stateQuery
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}
