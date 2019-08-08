import passport from 'passport';
import {config} from './app.config';
import passportFacebook from 'passport-facebook';
import passportGoogle from 'passport-google-oauth';

const GoogleStrategy = passportGoogle.OAuthStrategy;
const FacebookStrategy = passportFacebook.Strategy;

passport.use(new FacebookStrategy({
    clientID : config.FACEBOOK_APP_ID,
    clientSecret : config.FACEBOOK_APP_SECRET,
    callbackURL : config.FACEBOOK_APP_CALLBACK
},
    function (accessToken, refreshToken, profile, done) {
        
        /*
         * User.findOrCreate({}, function (err, user) {
         *     if (err) {
         *         return done(err);
         *     }
         *     done(null, user);
         * });
         */
        
    }
));

/*
 *   Use the GoogleStrategy within Passport.
 *   Strategies in passport require a `verify` function, which accept
 *   credentials (in this case, a token, tokenSecret, and Google profile), and
 *   invoke a callback with a user object.
 */
passport.use(new GoogleStrategy({
    consumerKey: config.GOOGLE_CONSUMER_KEY,
    consumerSecret: config.GOOGLE_CONSUMER_SECRET,
    callbackURL: config.GOOGLE_CONSUMER_CALLBACK
},
    function(token, tokenSecret, profile, done) {

        /*
         * User.findOrCreate({ googleId: profile.id }, function (err, user) {
         *     return done(err, user);
         * });
         */
    }
));
