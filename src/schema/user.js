import { gql } from 'apollo-server-express';

export default gql`
   
    directive @hasPermission(
    requires: String ,
    ) on FIELD_DEFINITION

    extend type Query {
        users: [User!] @hasPermission(requires:"viewUser")

        user(id: ID!): User @hasPermission(requires:"viewUser")

        usersByRole(role: String!):[User!] @hasPermission(requires:"viewUser")
    }
    extend type Mutation {
        createUser(
            firstName: String! 
            lastName: String!
            email: String!
            phone: Int
            password: String!
            userName: String!
        ):User! @hasPermission(requires:"createUser")

        updateUser(
            id: ID!
            firstName: String
            lastName: String
            userName: String
        ): User  @hasPermission(requires:"editUser")

        deleteUser(id: ID!): User  @hasPermission(requires:"deleteUser")
    }

    type User {
        id: ID! 
        firstName: String!  
        lastName: String!
        email: String!
        phone: Int
        password: String
        userName: String!
        pic: File
        bio: String
        resetToken: String
        role: Role
    }
    
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
`;
