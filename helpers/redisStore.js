const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const redisClient = redis.createClient();

module.exports=new RedisStore({
    host:process.env.REDIS_URI,
    port:process.env.REDIS_PORT,
    pass:process.env.REDIS_PASS,
    client: redisClient

});
