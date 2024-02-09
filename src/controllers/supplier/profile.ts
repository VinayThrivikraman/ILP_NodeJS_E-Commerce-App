import EcSuppliers from "../../models/ec_suppliers";
import { Request, Response} from 'express';

const profile = async (req: Request, res: Response) => {
    const {user_type, registration_id} = req.query;

    if(user_type == "supplier") {
        try {
            const foundUser = await EcSuppliers.findOne({where: {registration_id}, attributes:["e_mail","full_name"], raw: true});
            // const foundUser = await EcSuppliers.findOne({where: {registration_id}, attributes:{exclude:["password"]}, raw: true});
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
}

export default profile;