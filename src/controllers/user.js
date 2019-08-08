export default {
    get: async (parent, data, { models }) => {
        const users = await models.User.find();
        
        return users;
    },
    getByRole: async(parent, data, { models }) => {
        
        const role = await models.Role.findOne({slug : data.role})
        .populate('allusers');

        const {allusers} = role.toJSON({virtuals: true});

        return allusers;
    },
    view: async (parent, { id }, { models }) => {
        const user = await models.User.findById(id);

        return user;
    },
    create: async (parent, data, { models }) => {
        const user = await models.User.create(data);
        
        return user;
    },
    update: async (parent, data, { models }) => {
        const user = await models.User.findByIdAndUpdate(data.id,
            data, {
                new: true
            },
        )

        return user;
    },
    delete: async (parent, { id }, { models }) => {
        const user = await models.User.findById(id);
        if (user) {
            await user.remove();

            return true;
        }
        
        return false;  
    },
}
