const express = require('express');
const router = express.Router();
const { sendMessage } = require('./nexmo');
const users = require('./routes/users');

router.get('/call-for-help', (req, res, next) => {
    sendMessage();
    res.send({
        msg: 'Getting Help'
    });
});

router.use('/user', users);

module.exports = router;
