import authCtrl from '../controllers/auth';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../helpers/helper';

export default {
    Query: {
        me: authCtrl.accountDetails,
    },
    Mutation: {
        signUp: authCtrl.signUp,

        signIn: authCtrl.signIn,

        changePassword:  combineResolvers(
            isAuthenticated,
            authCtrl.changePassword
        ),

        forgotPassword : authCtrl.forgotPassword,

        resetPassword : authCtrl.resetPassword,

        editProfile : combineResolvers(
            isAuthenticated,
            authCtrl.editProfile
        )
    },

};
