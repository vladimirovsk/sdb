const redis = require("redis");
const client =  redis.createClient(
	global.conf.redis.port,
	global.conf.redis.host
);

global.redis = client;

 client.on('error', function(err) {
 	console.log('Error, redis is not running', err);
 });

 client.on('ready', function() {
	 console.log('redis is running');
 });

