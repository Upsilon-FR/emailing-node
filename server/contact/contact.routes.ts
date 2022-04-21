import { Router } from "express";
import ContactCtrl from "./contact.controller";

const router = Router();


router.get("/:id", ContactCtrl.getContact); //récupérer les details d'un contact
router.post("/add", ContactCtrl.addContact); //ajoute un contact
router.post("/update/:id", ContactCtrl.updateContact); //update un contact
router.delete("/delete/:id", ContactCtrl.delContact); //supprimer un contact

export default router;
