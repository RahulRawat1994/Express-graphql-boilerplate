export default {
    
    get: async (_parent, _data, {models}) => {
        const roles = await models.Role.find();
        
        return roles;
    },
    
    view: async (_parent, {id}, {models}) => {
        const role = await models.Role.findById(id);

        return role;
    },

    create: async (_parent, data, {models}) => {
        const role = await models.Role.create(data);

        return role;
    },

    update: async (_parent, data, {models}) => {
        
        const role = await models.Role.findByIdAndUpdate(
            data.id,
            data,
            { new: true },
        );

        return role;
    },
    delete: async (_parent, {id}, {models}) => {
        const role = await models.Role.findById(id);
        if (role) {
            await role.remove();
      
            return true;
        } 
      
        return false;
    },
}