import { Router } from "express";
import MessageStateCtrl from "./message.state.controller";

const router = Router();

router.post("/change", MessageStateCtrl.changeStateMsg); //Création d'un état
router.get("/all", MessageStateCtrl.recupEtat); //Ensemble des statuts proposés
router.post("/change", MessageStateCtrl.changeStateMsg); //Changement d'un état
router.delete("/change", MessageStateCtrl.changeStateMsg); //Suppression d'un état

export default router;
