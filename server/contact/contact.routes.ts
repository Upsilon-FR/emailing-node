import { Router } from "express";
import ContactCtrl from "./contact.controller";

const router = Router();

router.get("/details/:id", ContactCtrl.getContact); //Récupérer les details d'un contact
router.get("/all", ContactCtrl.getAll); //Récupérer les details de l'ensemble des contacts
router.post("/add", ContactCtrl.addContact); //Ajouter un contact
router.patch("/update", ContactCtrl.updateContact); //update l'email d'un contact
router.delete("/delete/:id", ContactCtrl.delContact); //supprimer un contact

export default router;
