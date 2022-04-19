import { Router } from "express";
import MessageStateCtrl from "./message.state.controller";

const router = Router();

// TODO: implement router

router.post("/change", MessageStateCtrl.changeStateMsg); //changement de l'état du message

export default router;
