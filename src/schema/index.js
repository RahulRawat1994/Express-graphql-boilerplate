import { gql } from 'apollo-server-express';

import authSchema from './auth';
import roleSchema from './role';
import userSchema from './user';

const  linkSchema = gql`

    scalar Date
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`;

export default [
    linkSchema, 
    userSchema, 
    roleSchema, 
    authSchema
];
