import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({ error: "Token not Provided" });
    }

    token = token?.split("Bearer ")[1];

    jwt.verify(token as string, 'your_secret-key', (err, decoded) => {
        if(err) {
            return res.status(401).json({ error: "Failed to authenticate token"});
        }

        req.body.jwt_decoded = decoded;
        next();
    });
};

export default verifyToken;