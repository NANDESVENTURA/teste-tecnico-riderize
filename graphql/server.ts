import 'reflect-metadata'
import Authentication from './middlewares/auth';
import { ApolloServer } from 'apollo-server';
import {typeDefs, resolvers} from "./schemas";
import { AuthChecker } from "type-graphql";

const app = async() =>{
    const server = new ApolloServer({typeDefs, resolvers});
    // const server = new ApolloServer({typeDefs, resolvers, context: Authentication({})});
    
    server.listen({port: 4000}, ()=>{
        console.log("Server Running on Port 4000");
    })
}

app();