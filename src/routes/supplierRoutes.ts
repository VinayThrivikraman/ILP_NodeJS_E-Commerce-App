import EcSuppliers from "../models/ec_suppliers";
import express, {Router, Request, Response} from 'express';

const router = Router();

router.get("/profile", async (req:Request,res:Response) => {
    const {user_type, registration_id} = req.query;

    if(user_type == "supplier") {
        try {
            const foundUser = await EcSuppliers.findOne({where: {registration_id}, raw: true});
            return res.status(200).json(foundUser);
        }
        catch(error) {
            return res.status(422).send(error);
        }
        
    }
    else {
        console.log("REACHED HERE");
        return res.status(401).send("INVALID USER TYPE");
    }
})

router.patch("/forgotPassword", async (req:Request,res:Response) => {
    const {user_type, registration_id, new_password} = req.body;

    if(user_type == "supplier") {
        try {
            await EcSuppliers.update({password: new_password}, {where: {registration_id}});
            return res.status(200).send(`Password Changed`);
        }
        catch(error){
            return res.status(500).send(error);
        }      
    }
    else{
        return res.status(404).send("INVALID USER TYPE");
    }
})

export default router;