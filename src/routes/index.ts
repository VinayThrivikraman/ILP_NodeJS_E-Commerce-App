import express, {Router, Request, Response} from 'express';
import login from "../controllers/authentication/login"
import registration from "../controllers/authentication/registration";
import middleware from '../middleware/middleware';

const router = Router();

router.post("/registration", async (req:Request, res:Response) => {
    registration(req, res);
})

router.post("/login", middleware, async (req:Request, res:Response) => {
    login(req, res);
})

export default router;