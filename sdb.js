const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = require('./routes');
const sdb = express();
const http = require('http')
const normalizePort = require('normalize-port');

const conf = require('./config')

global.conf = conf;

sdb.use(logger('dev'));
sdb.use(cors())
sdb.use(express.json());
sdb.use(express.urlencoded({extended: true}));
sdb.use(cookieParser());
sdb.use('/api/', router);
sdb.use('/api/static', express.static('public'));

// catch 404 and forward to error handler
sdb.use(function (req, res, next) {
	next(createError(404));
});

// error handler
sdb.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send('error ' + err.status);
});

const PORT = normalizePort(conf.port || 3000);
const httpServer = http.createServer(sdb)
httpServer.timeout = 60000;

process.on('unhandledRejection', (reason, promise) => {
    console.log("Error:", reason.message)//"me unhandledRejection unknown error 403 ")
});

httpServer.listen(PORT, function () {
    console.log(`Server listening on port ${PORT} with the single worker ${process.pid}`)
})

httpServer.on('error', function(err) {
    console.log('Error, created httpServer', err.message);
});

require('./api/app')
require('./api/lib/serverRedis');
global.db = require('./db')

module.exports = sdb;
