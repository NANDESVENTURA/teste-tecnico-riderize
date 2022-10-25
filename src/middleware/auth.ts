import jwt from 'jsonwebtoken';
import { auth } from "../config/index";

export const authorize = (req:any,res:any,next:any):void => {
    const token = req.headers.authorization;
    
    if (!token)
        return res.status(401).json({message: 'Não autorizado'})
    try {
        const decoded = jwt.verify(token, auth.secret) as any;
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(401).json({message: 'Não autorizado'})
    }
}

