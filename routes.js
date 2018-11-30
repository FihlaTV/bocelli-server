const express = require('express');
const router = express.Router();
const { sendMessage } = require('./nexmo');
const { routes, users, subscriptions } = require('./routes/users');

let reqID = 1;
const helpRequests = [
    {
        id: '1',
        date: Date.now(),
        userID: '1',
        text: 'Do my socks match?'
    }
];

router.post('/call-for-help', (req, res, next) => {
    const userID = req.body.userID;
    const text = req.body.text;
    
    if (!userID || !text) {
        const error = new Error('Bad Request');
        error.status = 400;
        
        next(error);
        return;
    }
    
    helpRequests[`${++reqID}`] = {
        date: Date.now(),
        userID,
        text
    };
    
    for (const loginName of subscriptions) {
        const user = users[loginName];
        
        if (!user || !user.number) continue;
        
        sendMessage(user.number);
    }
    
    res.send({
        msg: 'Getting Help'
    });
});

router.get('/help-requests', (req, res, next) => {
    res.send(helpRequests);
});

router.put('/remove-help-request', (req, res, next) => {
    
    const helpRequestID = req.body.helpRequestID;
    
    if (!helpRequestID) {
        const error = new Error('Bad Request');
        error.status = 400;
        
        next(error);
        return;
    }

    for (let i = helpRequests.length - 1; i >= 0; i--) {
        if (helpRequests[i].id === helpRequestID) {
            helpRequests.splice(i, 1);
        }
    }

    res.send({
        msg: 'Help request removed'
    });
});

router.use('/user', routes);

module.exports = router;
