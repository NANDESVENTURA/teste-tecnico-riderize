import prisma from '../database/index';
import { isAfter } from 'date-fns';

interface Subscription {
    ride_id: number,
    user_id: number,
    subscription_date: string
}

class SubscriptionService {
    public async listSubscriptions({ ride_id }: any): Promise<any> {

        const subscriptions = await prisma.subscription.findMany({
            where: {
                ride_id: parseInt(ride_id)
            },
            include: {
                ride: {
                    select: {
                        id: true,
                        participants_limit: true
                    }
                },
                user: {
                    select: {
                        id: true,
                    }
                }
            }
        });

        return subscriptions;
    }

    public async listSubscriptionsForUser({user_id}:any):Promise<any>{
        const subscriptionsForUser = await prisma.subscription.findMany({
            where: {
                user_id: parseInt(user_id)
            },
            include: { 
                ride:{
                    select:{
                        id:true,
                        name:true,
                        start_date:true,
                        start_date_registration:true,
                        end_date_registration:true,
                        start_place:true,
                        participants_limit: true                     
                    }
                },              
                user: {
                    select: {
                        id: true,
                    }
                }
            }
        });

        return subscriptionsForUser;
    }

    public async execute({ ride_id, user_id, subscription_date }: Subscription): Promise<any> {
        const findRide = await prisma.ride.findUnique({
            where: {
                id: ride_id
            }
        });

        const [result]: any = await prisma.$queryRaw`SELECT count(*) FROM (
            SELECT * FROM "public"."Subscription" A JOIN "public"."Ride" B
            ON A.ride_id = B.id
            WHERE A.ride_id = ${ride_id}) 
            AS CONSULT`

        const howMany = parseInt(result.count.toString());

        if (findRide && howMany >= findRide.participants_limit) {
            throw new Error("The limit of participants was reached");
        }
        const afterStarted = isAfter(new Date(), findRide!.start_date_registration);
        const beforeEnding = isAfter(findRide!.end_date_registration, new Date());

        if(!afterStarted){
            throw new Error("The subscriptions is not open");
        }

        if(!afterStarted || !beforeEnding) {
            throw new Error("The subscriptions is close");
        }

        //create      
        const newSubscription = await prisma.subscription.create({
            data: {
                ride_id,
                user_id,
                subscription_date
            }
        })
        return newSubscription;
    }

}

export default new SubscriptionService();