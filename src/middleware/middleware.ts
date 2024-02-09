import { Request, Response } from "express";

const middleware = (req:Request, res:Response, next: any) => {
    const reqApiKey = req.headers['x-api-key'];

    if(reqApiKey && reqApiKey == "helloWorld"){
        next();
    }
    else{
        res.status(400).send("INVALID API KEY");
    }
}

export default middleware;