const express = require('express');
const router = express.Router();
const { sendMessage } = require('./nexmo');
const { routes, users, subscriptions } = require('./routes/users');

router.get('/call-for-help', (req, res, next) => {

    for (const loginName of subscriptions) {
        const user = users[loginName];

        if (!user || !user.number) continue;

        sendMessage(user.number);
    }

    res.send({
        msg: 'Getting Help'
    });
});

router.use('/user', routes);

module.exports = router;
