const socketio=require('socket.io');
const socketAuthorization=require('../middlewares/socketAuthorization');
const io=socketio();
const socketApi={
    io
};
io.use(socketAuthorization);
/*
*redis adapter
* */
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter(
    { host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT
    }));
io.on('connection',socket =>{
console.log('a user logged in with name'+socket.request.user.surname);
});
module.exports=socketApi;
