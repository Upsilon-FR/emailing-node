import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

// TODO: implement router

router.post('/login', (req, res) => {AuthController.login})
router.post('/logout', (req, res) => {AuthController.logout})
router.post('/signin', (req, res) => {AuthController.signin})


export default router;
