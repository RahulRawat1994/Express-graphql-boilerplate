import userCtrl from '../controllers/user';
import {  isAuthenticated } from '../helpers/helper';
import { combineResolvers } from 'graphql-resolvers';

export default {
    Query: {
        users: combineResolvers(
            isAuthenticated,
            userCtrl.get
        ),
        
        user: combineResolvers(
            isAuthenticated,
            userCtrl.view
        ),
        
        usersByRole: combineResolvers(
            isAuthenticated,
            userCtrl.getByRole
        ),
    },
    Mutation: {
        createUser: combineResolvers(
            isAuthenticated,
            userCtrl.create
        ),
        updateUser: combineResolvers(
            isAuthenticated,
            userCtrl.create
        ),
        deleteUser: combineResolvers(
            isAuthenticated,
            userCtrl.delete
        ),
    },
    // Relation
    User: {
        role: async (user, args, { models }) => {
            if (!user.role) {
                return null;
            }
            const role = await models.Role.findOne(user.role);

            return role;
        },
    },
};
