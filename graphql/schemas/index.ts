import userController from "../controllers/user-controller";
import rideController from "../controllers/ride-controller";
import subscriptionController from "../controllers/subscription-controller";
import { format } from "date-fns";


export const typeDefs = `
type Session {
    token: String,
    user_id: ID,
}
 type User {
    id: ID,
    first_name: String
    last_name: String
    email: String
    password: String
 }
 type Ride {
    id: ID
    user_id: ID
    start_date: String
    start_date_registration: String
    end_date_registration: String
    additional_information: String
    start_place: String
    participants_limit: Int
  }
  type Subscription {
    id: ID
    ride_id: ID
    user_id: ID
    subscription_date:  String
}
 type Query {
   getUsers: [User]
   getSubscribers(ride_id: ID): [Subscription]
   getSubscribersComplete(user_id: ID): [Ride]
   getRideCreatedByUser(user_id: ID): [Ride]
 }

 type Mutation {
    createRide(
        user_id: ID,
        name: String,
        start_date: String,
          start_date_registration: String,
          end_date_registration: String,
          additional_information: String,
          start_place: String,
          participants_limit: Int
    ):Ride
    signIn(password: String, email: String): Session
    signUp(first_name: String, last_name: String, password: String, email: String): User
 }
`;

export const resolvers = {
    Query: {
        getUsers: async () => {
            try {
                const users = await userController.find();
                return users;
            } catch (error) {
                return {message: "Something went wrong"}
            }
        },

        getSubscribers: async (_: any, { ride_id }: any) => {
            try {
                const subscribers = await subscriptionController.listSubscriptions({ ride_id });
                return subscribers.map((data: any) => {
                    data.subscription_date = '' + new Date(data.subscription_date);
                    return data;
                });
            } catch (error) {
                return {message:"Something went wrong"}
            }
        },

        getSubscribersComplete: async (_: any, { user_id }: any) => {
            try {
                
                const rides = await subscriptionController.listSubscriptionsForUser({ user_id });
                return rides.map((data: any) => {
                    data.ride.start_date = '' + format(data.ride.start_date, 'yyyy-MM-dd');
                    data.ride.start_date_registration = '' + format(data.ride.start_date_registration, 'yyyy-MM-dd');
                    data.ride.end_date_registration = '' + format(data.ride.end_date_registration, 'yyyy-MM-dd');
                    return data.ride;
                });
            } catch (error) {
                return {message: "Something went wrong"}
            }
        },

        getRideCreatedByUser: async (_: any, { user_id }: any) => {
            try {
                
                const rides = await rideController.listCreateByUser({ user_id: parseInt(user_id) });
                return rides.map((data: any) => {
                    console.log(data.start_date,
                        data.start_date_registration,
                        data.end_date_registration);
                    data.start_date = '' + format(data.start_date, 'yyyy-MM-dd');
                    data.start_date_registration = '' + format(data.start_date_registration, 'yyyy-MM-dd');
                    data.end_date_registration = '' + format(data.end_date_registration, 'yyyy-MM-dd');
    
                    return data;
                });
            } catch (error) {
                return {message: "Something went wrong"}
            }
        }

    },

    Mutation: {
        createRide: async (_: any, { id, user_id, name, start_date, start_date_registration, end_date_registration, additional_information, start_place, participants_limit }: any) => {
            try {
                
                const newRide = await rideController.execute({ id, user_id: parseInt(user_id), name, start_date, start_date_registration, end_date_registration, additional_information, start_place, participants_limit })
                newRide.start_date = '' + format(newRide.start_date, 'yyyy-MM-dd');
                newRide.start_date_registration = '' + format(newRide.start_date_registration, 'yyyy-MM-dd');
                newRide.end_date_registration = '' + format(newRide.end_date_registration, 'yyyy-MM-dd');
                return newRide;
            } catch (error) {
                return {message: "Something went wrong"}
            }
        },

        signIn: async(_: any, {email, password}: any) => {
            try {
                const authorize = await userController.login({email, password});
                return authorize;
            } catch (error) {
                return {message: "Something went wrong"}
            }
        },

        signUp: async(_:any, {id, first_name, last_name, password, email}: any) =>{
            try {
                const newUser = await userController.execute({id, first_name,last_name, password, email});
                return newUser;
            } catch (error) {
                return {message: "Something went wrong"}
            }
        }

    }
}

