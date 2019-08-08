/**
 * Module dependencies.
 */
import http from 'http';
import app from '../index';
import {config} from '../config/app.config';

/**
 * Normalize a port into a number, string, or false.
 * @param {String|Number} val Port Number 
 * @return {Boolean|String} Return false or port string based on condition 
 */
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 * @param {Object} error json object
 * @returns {void} The sum of klsjdfl
 */
const onError = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        //console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
    default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    console.log(`Application start listing on ${bind}`);
}


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

