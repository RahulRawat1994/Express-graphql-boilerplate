import {ApolloServer} from 'apollo-server-express';
import {config} from './app.config';

import models from '../models/index';
import schema from '../schema';
import resolvers from '../resolvers';
import {getUserDetails} from '../helpers/helper';
import {HasPermission} from '../directives/HasPermission';

// Init GraphQL server
export const apolloServer = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs: schema,
    resolvers,
    //debug:true,
    schemaDirectives: {
        hasPermission: HasPermission
    },
    formatError: error => {

        /*
         * remove the internal sequelize error message
         * leave only the important validation error
         */
        const message = error.message.
            replace('SequelizeValidationError: ', '').
            replace('Validation error: ', '');
        
        return {
            ...error,
            message,
        };
    },
    context: async ({ req, res, connection }) => {
        if (connection) {
            return {
                models
            }
        }
        if (req) {
            const me = await getUserDetails(req);
           
            return {
                models,
                me,
                secret: config.SECRET,
                res
            };
        }
    },
    formatResponse(_data) {
        return {
            ..._data,
        }
    },
    
});
