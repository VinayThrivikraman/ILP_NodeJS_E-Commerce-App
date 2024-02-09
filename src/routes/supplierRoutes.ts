import forgotPassword from "../controllers/authentication/forgotPassword";
import profile from "../controllers/supplier/profile";
import {Router, Request, Response} from 'express';
import verifyToken from "../middleware/verifyjwt";

const router = Router();

router.get("/profile", verifyToken, async (req:Request,res:Response) => {
    profile(req, res);
})

router.patch("/forgotPassword", async (req:Request,res:Response) => {
    forgotPassword(req, res)
})

export default router;