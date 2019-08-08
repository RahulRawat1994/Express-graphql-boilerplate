/* eslint-disable no-console */
import mongoose from 'mongoose';
import {User} from './user';
import {Role} from './role';
import {Permission} from './permission';
import {config} from '../config/app.config';

export const connectDb = () => {
    
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    mongoose.connect(config.DB_CONN_STR, { useNewUrlParser:true})
    .then(() => {
        console.info(`Database connected ${config.DB_CONN_STR}`)
    })
    .catch(_err => {
        console.error('App starting error:', _err.stack);
        process.exit(1);
    })
}

export default {User, Role, Permission};
