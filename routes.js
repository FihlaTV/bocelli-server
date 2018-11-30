const express = require('express');
const router = express.Router();
const { sendMessage } = require('./nexmo');
const { routes, users, subscriptions } = require('./routes/users');

let reqID = 3;
const helpRequests = [
    {
        id: 4,
        date: Date.now(),
        userID: 'Dude',
        text: 'Where is my car? 🚘'
    },
    {
        id: 5,
        date: Date.now(),
        userID: 'Pixies',
        text: 'Where is my mind?'
    },
    {
        id: 3,
        date: Date.now(),
        userID: '🤖',
        text: 'Can anyone help me find my memory leak?'
    },
    {
        id: 2,
        date: Date.now(),
        userID: 'Blind Unicorn 🦄',
        text: 'Hey Stronzi, help me to find my eggplant 🍆'
    },
    {
        id: 1,
        date: Date.now(),
        userID: 'Tomer Amir',
        text: 'Do my socks match?'
    },
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
    
    helpRequests.push({
        id: ++reqID,
        date: Date.now(),
        userID,
        text
    });

    sendMessage(userID, text);
    
    // for (const loginName of subscriptions) {
    //     const user = users[loginName];
        
    //     if (!user || !user.number) continue;
        
    //     sendMessage(user.number);
    // }
    
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
