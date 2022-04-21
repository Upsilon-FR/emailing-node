import { Router } from "express";
import StatsCtrl from "./stats.controller";

const router = Router();

// TODO: implement router
/*total utilisateurs dont x admin et y user - total contacts
- total liste
- dernier message envoyé (id)

*/
router.get("/nb/user", StatsCtrl.fnct);
router.get("/nb/list", StatsCtrl.ttlList);
/**
 * - nombre total de messages envoyés
 */
router.get("/nb/msg/sent", StatsCtrl.nbMsgSent);
/**
 * - nombre de messages envoyés triés par type
 */
router.get("/nb/msg/type", StatsCtrl.nbMsgSentByType);
router.get("/last/msg/:id", StatsCtrl.lastMsgSent);

export default router;
