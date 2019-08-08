import { AuthenticationError, UserInputError } from 'apollo-server';
import {mail} from '../config/mail';
import {createJwtToken, randomStrToken, processUpload} from '../helpers/helper';
import {config} from '../config/app.config';

export default {
    accountDetails : async (parent, args, { models, me }) => {

        if (!me)  { return null; }
        const user = await models.User.findById(me.id);
        
        return user;
    },

    signUp: async (parent, data, { models},) => {

        const role = await models.Role.findOne({'slug' : config.DEFAULT_ROLE});
        if (role) { data.role = role.id; }
        const user = await models.User.create(data);

        return user;
    },

    signIn: async (parent, { login, password }, { models, secret }) => {

        const user = await models.User.findByLogin(login);
        
        if (!user) {
            throw new UserInputError(
                'No user found with this login credentials.',
            );
        }

        const isValid = await user.validatePassword(password);

        if (!isValid) {
            throw new AuthenticationError('Invalid password.');
        }
        const token =  createJwtToken(user, secret, '30m');

        return { token };
    },

    changePassword:async (parent, {oldPassword, newPassword}, {models, me}) => {
        const user = await models.User.findById(me.id);
    
        if (!user) {
            throw new UserInputError(
                'No user found.'
            );
        }

        const isValid = await user.validatePassword(oldPassword);
        if (isValid) {
            user.password = newPassword;
            await user.save();

            return true;
        }

        throw new AuthenticationError('Invalid Password');
    },

    forgotPassword : async(parent, {login}, {models}) => {
        
        const user = await models.User.findOneAndUpdate({
            $or:[
                {   userName : login   },
                {   email : login   }
            ]
        }, { resetToken : randomStrToken() }, { new:true });
        
        if (!user) {
            throw new UserInputError(
                'No user found with this user-Id.',
            );
        }
    
        const html = `
            Hi ${user.firstName} ${user.lastName},
            <br/>
            Token : ${user.resetToken}
        `;
        mail.sendMail({
            to : user.email,
            subject : 'Forgot Password',
            html
        })
        .catch(err => {
            console.log('Error:', err);
        });

        return { token : user.resetToken };

    },

    resetPassword : async(
        parent,
        {token, newPassword},
        {models}
    ) => {
        const user = await models.User.findByToken(token);
        if (!user) {
            throw new UserInputError(
                'No user found with this user-Id.',
            );
        }   
        user.resetToken = NaN;         
        user.password = newPassword;
        user.save();

        return true;
    },

    editProfile : async(parent, data, {models, me}) => {
        const formdata = data;
        formdata.file = undefined;
        if (data.file) {
            const upload = processUpload(data.file);
            formdata.pic = upload.path;
        }
    
        const user = await models.User.findOneAndUpdate({_id:me.id}, formdata, { new:true });
        
        if (!user) {
            throw new UserInputError(
                'No user found with this user-Id.',
            );
        }

        return user;
    }
}