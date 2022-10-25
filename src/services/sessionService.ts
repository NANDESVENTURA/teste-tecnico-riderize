import { findSync } from '@prisma/client/runtime';
import prisma from '../database/index';
import jwt from 'jsonwebtoken';
import { auth } from '../config/index';

interface Session {
    email: string;
    password: string;
}

class SessionService {
    public async authLogin({ email, password }: Session): Promise<any> {
       const findUser = await prisma.user.findFirst({
            where: {
                email: email,
            }            
        })
        if(password == findUser!.password){
            const token = await jwt.sign(
                {_id:findUser!.id
                    
                },
                auth.secret,
                {
                    expiresIn: auth.expires,
                }
            );
            return {
                token
            }     
        }
    }
}

export default new SessionService();

