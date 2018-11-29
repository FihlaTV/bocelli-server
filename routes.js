const express = require('express');
const router = express.Router();
const { sendMessage } = require('./nexmo');

router.get('/call-for-help', (req, res, next) => {
    sendMessage();
    res.send({
        msg: 'Getting Help'
    });
})

module.exports = router;
