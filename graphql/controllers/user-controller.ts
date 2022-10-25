import prisma from '../database/index';
import bcrypt from 'bcryptjs';
import { auth } from '../config/index';
import jwt from 'jsonwebtoken';

interface User {
    id: number,
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

class UserController {
    async find(){
        const user = await prisma.user.findMany();
        return user;
    }

    async create({id, first_name, last_name, email, password}: User): Promise<any> {
        const newUser = await prisma.user.create({
            data:{
                id,
                first_name,
                last_name,
                email,
                password
            }
        })

        return newUser;
    }

    public async findUnique(id:number):Promise<any>{
        const user = await prisma.user.findUnique({
            where: {
                id:id
            }
        });
        return user;
    }

    async login({email, password}:any): Promise<any>{
        const findUser = await prisma.user.findFirst({
            where: {
               email
            }
        })
        if(!findUser){
            throw new Error('User not found')
        }

        const passwordMatched =  bcrypt.compare(password,findUser!.password)

        if(!passwordMatched){
            throw new Error('Password does not match');
        }

        const token = await jwt.sign(
            {_id:findUser!.id
                
            },
            auth.secret,
            {
                expiresIn: auth.expires,
            }
        );
        return {
            token,
            user: findUser
        }       
    }

    async execute({id, first_name, last_name, email, password}: User) : Promise<any> {
        const findUser = await prisma.user.findFirst({
            where: {
               email
            }
        })

        if(findUser) {
            throw Error('User already registered')
        }
        
        const hashedPassword = await bcrypt.hash(password,8)
        const newUser = await prisma.user.create({
            data:{
                id,
                first_name,
                last_name,
                email,
                password:hashedPassword
            }
        })
        return newUser;
    }
}

export default new UserController();


