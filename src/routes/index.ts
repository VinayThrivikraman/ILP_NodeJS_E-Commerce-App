import EcSuppliers from "../models/ec_suppliers";
import express, {Router, Request, Response} from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const router = Router();

router.post("/registration", async (req:Request, res:Response) => {
    const {full_name, e_mail, password, profile_pic, user_type} = req.body;

    if(user_type == "supplier"){
        try {
            await EcSuppliers.create({full_name, e_mail, password, profile_pic});
            return res.status(200).send(`${full_name} has Successfully Registered`);
        }
        catch(error){
            console.log(error);
            return res.status(409).send(`Error: ${error}`);
        }
    } 
})

router.post("/login", async (req:Request, res:Response) => {
    const {e_mail, password, user_type} = req.body;

    if(user_type == "supplier"){
        try{
            console.log("\n\nREACHED LOGIN\n\n")

            const foundUser = await EcSuppliers.findOne({where:{e_mail}, raw:true});
            if(foundUser && bcrypt.compareSync(password, foundUser.password)) {
                const token = jwt.sign({user_reg_id: foundUser.registration_id, user_type : user_type}, "your_secret",{expiresIn:"24h"});
                return res.json({token, user_name: foundUser.full_name, registration_id: foundUser.registration_id, user_type: user_type});
            }
            else {
                return res.status(401).send("Invalid Credentials");
            }
            
        }
        catch(error){
            return res.send(error);
        }
    }
    else {
        console.log("REACHED HERE");
        return res.status(401).send("INVALID USER TYPE");
    }

})

export default router;