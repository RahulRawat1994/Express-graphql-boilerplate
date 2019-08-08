/* eslint-disable no-undef */
import 'dotenv/config';

export const config = {
    
    PORT : process.env.PORT || 3000,
    DB_CONN_STR : process.env.DB_CONN_STR,
    SECRET : process.env.SECRET,
    ADMIN_ROLE : process.env.ADMIN_ROLE,
    DEFAULT_ROLE : process.env.DEFAULT_ROLE,
    
    // Facebook 
    FACEBOOK_APP_ID :  process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET : process.env.FACEBOOK_APP_SECRET,
    FACEBOOK_APP_CALLBACK : 'http://www.example.com/auth/facebook/callback',

    // Google
    GOOGLE_CONSUMER_KEY : process.env.GOOGLE_CONSUMER_KEY,
    GOOGLE_CONSUMER_SECRET : process.env.GOOGLE_CONSUMER_SECRET,
    GOOGLE_CONSUMER_CALLBACK : process.env.GOOGLE_CONSUMER_CALLBACK,

    // Mail 
    MAIL_SERVICE_HOST : process.env.MAIL_SERVICE_HOST,
    MAIL_SERVICE_SECURE : process.env.MAIL_SERVICE_SECURE,
    MAIL_SERVICE_PORT : process.env.MAIL_SERVICE_PORT,
    MAIL_USER_NAME : process.env.MAIL_USER_NAME,
    MAIL_USER_PASSWORD : process.env.MAIL_USER_PASSWORD,
}
