import { Router } from "express";
import MessageCtrl from "./message.controller";

const router = Router();

// TODO: implement router

router.get("/:id", MessageCtrl.fnct); //récupérer un message pour un compte
router.get("/list/:mail", MessageCtrl.msgUser); //récupérer l'ensemble des messages d'un user
router.get("/list/:mail", MessageCtrl.msgContact); //récupérer l'ensemble des messages d'un contact
router.post("/", MessageCtrl.sendMsg); //envoyer un message
router.delete("/", MessageCtrl.delMsg); //supprimer un message

export default router;
