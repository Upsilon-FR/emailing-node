import { Router } from "express";
import StatsCtrl from "./stats.controller";

const router = Router();

router.get("/:token", StatsCtrl.fnct);
router.post("/", StatsCtrl.fnct);

// TODO: implement router

export default router;
