/* eslint-disable no-sync */
/* eslint-disable no-unused-expressions */
import fs from 'fs';
import path from 'path';
import rfs from 'rotating-file-stream';

// eslint-disable-next-line no-undef
const logDirectory = path.join(__dirname, '../logs');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
const accessLogStream = rfs('access.log', {
    interval: '1d', 
    path: logDirectory
})

export const log = {
    skip:  (req, res) => res.statusCode === 200,
    stream: accessLogStream
}
