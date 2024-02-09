import EcSuppliers from "../models/ec_suppliers";
import express, {Router, Request, Response} from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import login from "../controllers/authentication/login"
import { register } from "module";
import registration from "../controllers/authentication/registration";

const router = Router();

router.post("/registration", async (req:Request, res:Response) => {
    registration(req, res);
})

router.post("/login", async (req:Request, res:Response) => {
    login(req, res);
})

export default router;