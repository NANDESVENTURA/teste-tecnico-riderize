import { PrismaClientRustPanicError } from '@prisma/client/runtime';
import prisma from '../database/index';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

class UserService{
    public async listUsers():Promise<any>{
        const users =await prisma.user.findMany();
        return users;
    }

    public async findUnique(id:number):Promise<any>{
        const user = await prisma.user.findUnique({
            where: {
                id:id
            }
        });
        return user;
    }

    public async execute({id, first_name, last_name, email, password}: User) : Promise<any> {
        const findUser = await prisma.user.findFirst({
            where: {
               email
            }
        })

        if(findUser) {
            throw Error('User already registered')
        }
        
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
}

export default new UserService();
