

import { SchemaDirectiveVisitor } from 'apollo-server';

export class HasPermission extends SchemaDirectiveVisitor {

    /*
     * Visitor methods for nested types like fields and arguments
     * also receive a details object that provides information about
     * the parent and grandparent types.
     */
    
    visitFieldDefinition(field) {
        const requiredRole = this.args.requires;
        // eslint-disable-next-line no-undef
        const { resolve = defaultFieldResolver } = field;
        
        field.resolve = async function (...args) {
            // eslint-disable-next-line prefer-destructuring
            const context = args[2];
            if (!context.me) {
                throw new Error('Unauthenticate User');
            }

            const user = await context.models.User.findById(context.me.id);
            const isCheck = await context.models.Role.aggregate([
                {
                    $match:{ '_id':user.role}
                },
                {
                    $lookup:{
                        from :'permissions',
                        localField:'permissions._id',
                        foreignField: '_id',
                        as : 'permissions'
                        
                    },
                },
                {
                    $match:{ 'permissions.name':requiredRole}
                }
            ]);
            
            if (!isCheck || isCheck.length <= 0) {
                throw new Error('Not authorized to perform this operation');
            }

            return await resolve.apply(this, args);
        };

    }
    
    static getDirectiveDeclaration(directiveName, schema) {
        const previousDirective = schema.getDirective(directiveName);
        if (previousDirective) {
        
            previousDirective.args.forEach(arg => {
                if (arg.name === 'requires') {
                    arg.defaultValue = 'REVIEWER';
                }
            });
    
            return previousDirective;
        }
    }

   
}
