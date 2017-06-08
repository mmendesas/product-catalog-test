var redis = require('redis');

var myRedis = {
    /* redis */
    host: process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1',
    port: process.env.REDIS_PORT_6379_TCP_PORT || 6379,    

    getClient: function(){
        return this.client;
    },

    start: function () {
        this.client = redis.createClient(this.port, this.host);

        this.client.on("error", function (err) {
            console.log("Error in Redis: " + err);
        });

        this.client.on('connect', function () {
            console.log('Connected to Redis');
        });
    }
}

module.exports = myRedis;