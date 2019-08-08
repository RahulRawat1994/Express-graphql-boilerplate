import { gql } from 'apollo-server-express';

export default gql`

    extend type Query{
        me: User
    }
    extend type Mutation {
        
        signUp(
            firstName: String!
            lastName: String!
            email: String!
            phone: Int
            password: String!
            userName: String!
        ):User!

        signIn(
            login: String!
            password: String!
        ):Token!

        changePassword(
            oldPassword:String!
            newPassword:String!
        ):Boolean

        forgotPassword(
            login:String!
        ):Token

        resetPassword(
            token:String!
            newPassword:String
        ):Boolean

        editProfile(
            firstName: String
            lastName: String
            userName: String
            file: Upload
            bio: String
        ):User!
        

    }
    type Token {
        token: String!
    }
    

`;
