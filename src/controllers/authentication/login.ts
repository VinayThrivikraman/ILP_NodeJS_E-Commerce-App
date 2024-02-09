import EcSuppliers from "../../models/ec_suppliers";
import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req: Request, res: Response): Promise<
    Response<any, Record<
        any,
        {token:string, full_name:string, registration_id:string, user_type:"string"}
    >>> => {
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
                return res.status(401).json("Invalid Credentials");
            }
            
        }
        catch(error){
            return res.json(error);
        }
    }
    else {
        console.log("REACHED HERE");
        return res.status(401).send("INVALID USER TYPE");
    }
}

export default login;