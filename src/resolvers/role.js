
import roleCtrl from '../controllers/role';

export default {
    Query: {
        roles: roleCtrl.get,
        role: roleCtrl.view
    },

    Mutation: {
        createRole: roleCtrl.create,
        updateRole: roleCtrl.update,
        deleteRole: roleCtrl.delete,
    }

};
