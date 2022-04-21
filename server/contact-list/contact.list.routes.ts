import { Router } from "express";
import ContactListCtrl from "./contact.list.controller";

const router = Router();

router.get("/:id", ContactListCtrl.getList); //récupérer les details d'un contact
router.post("/create", ContactListCtrl.create); //ajoute une liste de contacts
router.post("/update/:list/add/:contact", ContactListCtrl.addContactToList); //update une liste de contacts
router.post("/update/:list/remove/:contact", ContactListCtrl.removeContactFromList); //update une liste de contacts
router.delete("/delete/:id", ContactListCtrl.delete); //supprimer une list de contacts

export default router;
