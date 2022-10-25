import { AuthChecker } from "type-graphql";
import {verify} from 'jsonwebtoken';
import { auth } from '../config';


interface Context {
    token?: string,
}

const Authentication: AuthChecker<Context>  = ({context}): boolean => {
    const authHeader = context!.token;

    if(!authHeader) {
        return false;
    }

    const [, token] = authHeader.split( '')

    try {
      const decoded = verify(token, auth.secret);
      return !!decoded  
    } catch (error) {
        return false;
    }
}

export default Authentication;