import { Router } from "express";
import StatsCtrl from "./stats.controller";

const router = Router();

// TODO: implement router

/**
 * - nombre total d'utilisateurs dont x admin et y user
 */
router.get("/nb/user", StatsCtrl.ttlUsers);
/**
 * - nombre total de contact
 */
router.get("/nb/contact", StatsCtrl.ttlContact);
/**
 * - nombre total de list
 */
router.get("/nb/list", StatsCtrl.ttlList);
/**
 * - nombre total de messages envoyés
 */
router.get("/nb/msg/sent", StatsCtrl.nbMsgSent);
/**
 * - nombre de messages envoyés triés par type
 */
router.get("/nb/msg/type", StatsCtrl.nbMsgSentByType);
/**
 * - dernier message envoyé
 */
router.get("/last/msg", StatsCtrl.lastMsgSent);

export default router;
