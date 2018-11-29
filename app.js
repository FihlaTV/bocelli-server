const http = require('http');
const app = require('express')(http);

const bodyParser = require('body-parser');

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

app.listen(3000, () => {
    console.log('server is running on port 3000');
});
