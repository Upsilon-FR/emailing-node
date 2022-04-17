import { Router } from "express";
import MessageCtrl from "./message.controller";

const router = Router();

// TODO: implement router

router.get("/:id", MessageCtrl.fnct); //récupérer un message pour un compte
router.get("/list/:mail", MessageCtrl.fnct); //récupérer l'ensemble des messages d'un user
router.get("/list/:mail", MessageCtrl.fnct); //récupérer l'ensemble des messages d'un contact
router.post("/", MessageCtrl.fnct); //envoyer un message

export default router;
