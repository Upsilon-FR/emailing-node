import { Router } from "express";
import StatsCtrl from "./stats.controller";

const router = Router();

router.get("/nb/user", StatsCtrl.ttlUsers); //Nombre total d'utilisateurs dont x admin et y user
router.get("/nb/contact", StatsCtrl.ttlContact); //Nombre total de contact
router.get("/nb/list", StatsCtrl.ttlList); //Nombre total de list
router.get("/nb/msg/sent", StatsCtrl.nbMsgSent); //Nombre total de messages envoyés
router.get("/nb/msg/type", StatsCtrl.nbMsgSentByType); //Nombre de messages envoyés triés par type
router.get("/last/msg", StatsCtrl.lastMsgSent); //Dernier message envoyé

export default router;
