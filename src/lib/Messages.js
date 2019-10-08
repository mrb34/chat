const shortid = require('shortid');
const redisClient=require('../redisClient');

function Messages() {
    this.client =redisClient.getClient();
};
module.exports = new Messages();
Messages.prototype.upsert = function ({roomId,messages,username,surname}) {

    this.client.hset(
        'messages:'+roomId,
        shortid.generate(),
        JSON.stringify({
            username,
            surname,
            messages,
            when: Date.now()
        }),
        err => {
            if (err) {
                console.error(err);
            }

        }
    )
};