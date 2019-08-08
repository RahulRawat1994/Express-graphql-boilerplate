import mongoose from 'mongoose';
import slugify from 'slugify';
import uniqueValidator from 'mongoose-unique-validator';

const {Schema} = mongoose;

//  Role Collection Schema
const roleSchema = new Schema({
    name:{
        type: String,
        unique:true
    },
    slug:{
        type: String,
        unique:true
    },
    permissions :[
        {
            type: Schema.Types.ObjectId, ref: 'permissions' 
        }
    ],
}, { toJSON: { virtuals: true }})

// Role Collection Virtual Population
roleSchema.virtual('allusers', {
    ref: 'users',
    localField: '_id',
    foreignField: 'role'
});

// Enable Timestamps
roleSchema.set('timestamps', true);

// Middleware Hooks
roleSchema.pre('save', async function() {
    // eslint-disable-next-line no-invalid-this
    this.slug = await slugify(this.name); 
})

// Plugins
roleSchema.plugin(uniqueValidator);

export const Role = mongoose.model('roles', roleSchema)
