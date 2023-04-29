var express = require('express');
var prom = require('prom-client');
const register = prom.register;

var app = express();

const counter = new prom.Counter({
    name: 'class_request_total',
    help: 'Requests counter',
    labelNames: ['statusCode']
});

const gauge = new prom.Gauge({
    name: 'class_free_bytes',
    help: 'Example of gauge'
});


app.get('/', (req, res, next) => {
  counter.labels('200').inc();
  counter.labels('300').inc();
  gauge.set(100*Math.random());
  res.send('Hello World');
});

app.get('/metrics', async function(req, res) {
    res.set('Content-Type', register.ContentType);
    res.end(await register.metrics());
});

app.listen(3000);