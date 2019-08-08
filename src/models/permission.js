import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const {Schema} = mongoose;

const permissionSchema = new Schema({
    name:{
        type: String,
        unique:true
    }
}, { toJSON: { virtuals: true }});

permissionSchema.virtual('roles', {
    ref: 'roles',
    localField: '_id',
    foreignField: 'permissions'
});

permissionSchema.set('timestamps', true);

permissionSchema.plugin(uniqueValidator);

export const Permission = mongoose.model('permissions', permissionSchema)
