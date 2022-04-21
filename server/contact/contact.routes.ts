import { Router } from "express";
import ContactCtrl from "./contact.controller";

const router = Router();


router.get("/:id", ContactCtrl.getContact); //récupérer les details d'un contact
router.get('/', ContactCtrl.getAll);
router.post("/add", ContactCtrl.addContact); //ajoute un contact
router.patch("/update/name/:id", ContactCtrl.updateContactName); //update le nom d'un contact
router.patch("/update/email/:id", ContactCtrl.updateContactEmail); //update l'email d'un contact
router.delete("/delete/:id", ContactCtrl.delContact); //supprimer un contact

export default router;
