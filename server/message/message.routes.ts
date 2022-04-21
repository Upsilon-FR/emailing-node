import { Router } from "express";
import MessageCtrl from "./message.controller";

const router = Router();

// TODO: implement router

router.get("/:id", MessageCtrl.msgUser); //récupérer un message pour un compte
router.get("/list/user/:id", MessageCtrl.msgUser); //récupérer l'ensemble des messages d'un user
router.get("/list/contact/:contact", MessageCtrl.msgContact); //récupérer l'ensemble des messages d'un contact
router.post("/brouillon", MessageCtrl.brouillonMsg); //message brouillon
router.post("/send", MessageCtrl.sendMsg); //envoyer un message
router.post("/update", MessageCtrl.delMsg); //supprimer un message
router.delete("/delete", MessageCtrl.delMsg); //supprimer un message

export default router;
