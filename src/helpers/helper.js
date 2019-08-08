import fs from 'fs';
import jwt from 'jsonwebtoken';
import {config} from '../config/app.config';
import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';
import {models} from '../models/index';
/**
 * Create a new jwt token 
 * @param {Object} user User object
 * @param {String} secret Jwt Secret
 * @param {String|Number} expiresIn Expiration date for jwt token
 * @returns {String} Return generated token 
 */
export const createJwtToken = async (user, secret, expiresIn) => {
    const { id, email, username } = user;
    const token = await jwt.sign({ id, email, username }, secret, {
        expiresIn,
    });

    return token;
};

/**
 * Store file in the upload directory
 * @param {Object} { stream, filename } 
 * @requires Promise Return promise object 
 */
export const storeFile = ({ stream, filename }) => {

    const path = `${config.UPLOAD_DIR}/${filename}`

    return new Promise((resolve, reject) => {
        stream.on('error', error => {
            if (stream.truncated) {
                // Delete the truncated file.
                fs.unlinkSync(path)
            }
            reject(error)
        })
        .pipe(fs.createWriteStream(path))
        .on('error', error => reject(error))
        .on('finish', () => resolve({ path }))
    })
}

export const processUpload = async upload => {
    const { createReadStream, filename, mimetype } = await upload
    const stream = createReadStream()
    const { id, path } = await storeFile({ stream, filename })

    return { id, filename, mimetype, path }
}

/**
 * Generate randon string 
 * @returns {String} random string characters
 */
export const randomString = () => Math.random().toString(36)
.substr(2);

/**
 * Genearte random string token 
 * @returns {String} token
 */
export const randomStrToken = () => randomString() + randomString();

/**
 * Check is user authenticated or not
 * @param {Object} parent 
 * @param {Object} _args 
 * @param {Object} param2 
 * @returns {Boolean} return true/false based on check
 */
export const isAuthenticated = (parent, _args, { me }) => {
    me ? skip : new ForbiddenError('Not authenticated');
}

/**
 * Check user has assigned Admin role
 * @returns {Boolean} true/false
 */
export const isAdmin = combineResolvers(
    isAuthenticated,
    (parent, args, { me: { role } }) => role === (config.ADMIN_ROLE
      ? skip
      :  new ForbiddenError('Not authorized as admin.')),
);

export const isPatient = combineResolvers(
    isAuthenticated,
    (parent, args, { me: { role } }) => role === (config.DEFAULT_ROLE
      ? skip
      : new ForbiddenError('Not authorized as admin.')),
);

export const getUserDetails = async req => {
    const token = req.headers['x-token'];
    if (token) {
        try {
            return await jwt.verify(token, config.SECRET);
        } catch (e) {
            // eslint-disable-next-line no-undef
            /*
             * throw new AuthenticationError(
             * 'Your session expired. Sign in again.',
             * );
             */
            return null;
        }
    }
};

export const hasPermission = async (permission, user) => {
    
    const isCheck = await models.Role.aggregate([
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
            $match:{ 'permissions.name':permission}
        }
    ]);

    if (!isCheck) {
        throw new ForbiddenError('Not authorized to perform this operation.');
    }
}

