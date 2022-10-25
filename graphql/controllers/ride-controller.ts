import prisma from '../database/index';

interface Request {
    id: number;
    user_id:number;
    name: string;
    start_date: string;
    start_date_registration: string;
    end_date_registration: string;
    additional_information: string;
    start_place: string;
    participants_limit: number
}

class RideService{
    public async listRides(): Promise<any> {
        const rides = await prisma.ride.findMany();
        return rides;
    }

    public async findUnique(id:number):Promise<any> {
        const ride = await prisma.ride.findUnique({
            where:{
                id:id
            }
        });
        return ride;
    }

    public async listCreateByUser({user_id}:any):Promise<any>{
        const createForUser = await prisma.ride.findMany({
            where: {
                user_id: user_id
            },
            include: {                     
                user: {
                    select: {
                        id: true,
                    }
                }
            }
        });

        return createForUser;
    }

    public async execute({id,user_id, name, start_date,start_date_registration,end_date_registration,additional_information,start_place,participants_limit}: Request):Promise<any>{
        const rideDate = new Date(start_date);
        const findRide = await prisma.ride.findFirst({
            where: {
               start_date:rideDate,
               user_id: user_id,
                start_place:start_place
            }
        });
        
        if(findRide){
            throw Error('There is already a ride for that date')
        }
        
        const newRide = await prisma.ride.create({
            data:{
                id: id,
                name: name,
                user_id,
                start_date: new Date(start_date),
                start_date_registration: new Date(start_date_registration),
                end_date_registration: new Date(end_date_registration),
                additional_information: additional_information,
                start_place: start_place,
                participants_limit: participants_limit
            }
        });

        return newRide;
    }

}

export default new RideService();