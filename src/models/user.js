import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';

const {Schema} = mongoose;

const userSchema = new Schema({
    userName:{
        type: String,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        validate: {
            // eslint-disable-next-line prefer-named-capture-group
            validator: v => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/u).
            test(v,),
            message: '{VALUE} is not a valid email!',
        },
        unique: true,
    },
    password:{
        type: String,
        required:true,
        minlength: 6,
        maxlength: 42,
    },
    phone:{
        type:Number,
        unique: true,
    },
    resetToken:{
        type: String
    },
    role: { type: Schema.Types.ObjectId, ref: 'roles' }

})

userSchema.statics.findByLogin = async function(login) {
    let user = await this.findOne({
        $or:[
                {userName: login},
                {email:login}
        ]
    });
    if (!user) {
        user = await this.findOne({ email: login });
    }
    
    return user;
};

userSchema.statics.findByToken = async function(token) {
    const user = await this.findOne({
        resetToken: token
    });
    
    return user;
};

userSchema.set('timestamps', true);

userSchema.pre('save', async function() {
    // eslint-disable-next-line no-invalid-this
    this.password = await this.generatePasswordHash();
});
  
userSchema.methods.generatePasswordHash = async function() {
    const saltRounds = 10;
    const hash = await bcrypt.hash(this.password, saltRounds);

    return hash;
};

userSchema.methods.validatePassword = async function(password) {
    const checkPassword = await bcrypt.compare(password, this.password);

    return checkPassword;
};

userSchema.plugin(uniqueValidator);

export const User = mongoose.model('users', userSchema);
