import EcSuppliers from "../../models/ec_suppliers";
import { Request, Response} from 'express';

const registration = async (req: Request, res: Response) => {
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
}

export default registration;