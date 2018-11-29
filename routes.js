const express = require('express');
const router = express.Router();

router.get('/call-for-help', (req, res, next) => {
    res.send({
        msg: 'Getting Help'
    });
})

module.exports = router;
