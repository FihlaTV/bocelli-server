const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express(http);

const bodyParser = require('body-parser');

app.use(express.static('client'))

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

app.use('/status', (res, res) => {
    res.send('OK');
});

const api = require('./routes');
app.use('/api', api);

// Not found
app.use((req, res, next) => {
    error = new Error('Not Found');
    error.status = 404;

    next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status);
    
    const error = {
        status,
        message: err.message
    };

    console.error(error);
    res.send(error);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
