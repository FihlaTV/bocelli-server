const express = require('express');
const router = express.Router();

class User {
    constructor(firstName, lastName, username, password, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }

    static createFromRequest(user) {
        return Object.assign(new User(), user);
    }
}

const users = {};
const subscriptions = [];

router.post('/login', (req, res, next) => {
    const user = users[req.body.username];
    if (!user || user.password != req.body.password) {
        const error = new Error(`Unauthorized`);
        error.status = 401;

        next(error);
        return;
    }

    res.send(user);
});

router.post('/register', (req, res, next) => {
    const body = req.body;
    if (!body.firstName || !body.lastName || !body.username || !body.password) {
        console.log('here');
        const error = new Error('Bad Request');
        error.status = 400;
        next(error);

        return;
    }

    const user = User.createFromRequest(body);

    if (users[user.username]) {
        const error = new Error(`Username ${user.username} already exists`);
        error.status = 409;

        next(error);
        return;
    }

    users[user.username] = user;

    res.send(user);
});

router.put('/subscribe', (req, res, next) => {
    const userID = req.body.userID;
    const username = req.body.username;

    if (!userID) {
        const error = new Error('Bad Request');
        error.status = 400;

        next(error);
        return;
    }

    const subs = subscriptions[userID] || new Set();
    subs.add(username);

    subscriptions[userID] = subs;

    res.status(204).send();
});

module.exports = {
    routes: router,
    subscriptions,
    users
};
