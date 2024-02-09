import EcSuppliers from "../../models/ec_suppliers";
import { Request, Response} from 'express';

const forgotPassword = async (req: Request, res: Response) => {
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
}

export default forgotPassword;