import forgotPassword from "../controllers/authentication/forgotPassword";
import profile from "../controllers/supplier/profile";
import {Router, Request, Response} from 'express';

const router = Router();

router.get("/profile", async (req:Request,res:Response) => {
    profile(req, res);
})

router.patch("/forgotPassword", async (req:Request,res:Response) => {
    forgotPassword(req, res)
})

export default router;