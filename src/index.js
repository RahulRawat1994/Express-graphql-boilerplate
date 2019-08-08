import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import {log} from './config/log';
import {connectDb} from './models/index';
import {apolloServer} from './config/apollo.graphql';
import passport from 'passport';
import './config/passport';

// Establish Database Connection
connectDb();


//Init Express
const app = express();

// express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(logger('common', log));
app.use(cors());

// Attach Graph Ql server
apolloServer.applyMiddleware({app, path: '/api'});

/**
 * Routes 
 */
app.get('/', (req, res) => {  res.json({'app_name':'T Care'}) });
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',  passport.authenticate('facebook', { 
    successRedirect: '/',
    failureRedirect: '/login' 
}));
app.get('/auth/google', passport.authenticate('google', { 
    scope: 'https://www.google.com/m8/feeds' 
}));
app.get('/auth/google/callback', passport.authenticate('google', { 
    failureRedirect: '/login' 
}), function(req, res) {
    res.redirect('/');
});
  
export default app;
