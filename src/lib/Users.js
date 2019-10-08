const redis=require('redis');
function Users() {
    this.client=redis.createClient({
        host:process.env.REDIS_URI,
        port:process.env.REDIS_PORT,
    });
};
module.exports=new Users();
Users.prototype.upsert=function (connectionID,meta) {
this.client.hset(
    'online',
    meta.googleId,
    JSON.stringify({
        connectionID,
        meta,
        when: Date.now()
    }),
    err => {
        if (err)
        {
            console.error(err);
        }

    }
)
};