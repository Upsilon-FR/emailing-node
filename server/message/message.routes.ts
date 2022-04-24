import { Router } from "express";
import MessageCtrl from "./message.controller";

const router = Router();

router.get("/list", MessageCtrl.getMessage); //Récupérer l'ensemble des messages
router.get("/list/ready", MessageCtrl.getMessageReady); //Récupérer l'ensemble des messages prêt à être envoyés
router.get("/:id", MessageCtrl.msgUser); //Récupérer un message pour un compte
router.get("/list/user/:id", MessageCtrl.msgUser); //Récupérer l'ensemble des messages d'un user
router.get("/list/contact/:contact", MessageCtrl.msgContact); //Récupérer l'ensemble des messages d'un contact
router.post("/brouillon", MessageCtrl.brouillonMsg); //Message brouillon
router.post("/prepare", MessageCtrl.prepareMsg); //Message prêt
router.patch("/send", MessageCtrl.sendMsg); //Envoyer un message
router.patch("/update", MessageCtrl.changeMsg); //Modifier un message
router.delete("/delete", MessageCtrl.delMsg); //Supprimer un message

export default router;
