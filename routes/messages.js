const express = require('express');
const router = express.Router();
//libs
const Messages=require('../src/lib/Messages')

router.get('/list', (req, res, next)=> {
    //console.log(req.query);
    Messages.list(req.query.roomId,messages=>{
        res.json(messages);
    });

});

module.exports = router;
