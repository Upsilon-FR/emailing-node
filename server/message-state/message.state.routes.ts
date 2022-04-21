import { Router } from "express";
import MessageStateCtrl from "./message.state.controller";

const router = Router();

// TODO: implement router

/**
 * Création d'un état
 */
router.post("/change", MessageStateCtrl.changeStateMsg);

/**
 * Ensemble des statuts proposés
 */
router.get("/all", MessageStateCtrl.recupEtat);

/**
 * Changement de statut d'un message
 */
router.post("/change", MessageStateCtrl.changeStateMsg);

/**
 * Changement d'un état
 */
router.post("/change", MessageStateCtrl.changeStateMsg);

/**
 * Suppression d'un état
 */
router.delete("/change", MessageStateCtrl.changeStateMsg);

export default router;
