import { Router } from "express";
import MessageStateCtrl from "./message.state.controller";

const router = Router();

router.post("/create", MessageStateCtrl.createStateMsg); //Création d'un état
router.get("/all", MessageStateCtrl.getState); //Ensemble des statuts proposés
router.patch("/change", MessageStateCtrl.changeStateMsg); //Changement d'un état
router.delete("/delete", MessageStateCtrl.delStateMsg); //Suppression d'un état

export default router;
