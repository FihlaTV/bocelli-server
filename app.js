const http = require('http');
const express = require('express');
const app = express(http);

const bodyParser = require('body-parser');

app.use(express.static('client'))

app.use(bodyParser.json());

app.post('/tomer', (req, res, next) => {
    console.log(req.body);
    res.send('hi there');
});

const api = require('./routes');
app.use('/api', api);

// Not found
app.use((req, res, next) => {
    res.status(404);
    res.send('Not Found');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
