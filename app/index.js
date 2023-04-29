var express = require('express');
var promClient = require('prom-client');
const register = promClient.register;

var app = express();

const counter = new promClient.Counter({
    name: 'class_request_total',
    help: 'Requests counter',
    labelNames: ['statusCode']
});

const gauge = new promClient.Gauge({
    name: 'class_free_bytes',
    help: 'Example of gauge'
});

const histogram = new promClient.Histogram({
    name: 'class_request_time_seconds',
    help: 'Time to response from API',
    buckets: [0.1, 0.2, 0.3, 0.4, 0.5],
});


app.get('/', (req, res, next) => {
  counter.labels('200').inc();
  counter.labels('300').inc();
  gauge.set(100*Math.random());
  histogram.observe(Math.random()); // Observe value in histogram
  res.send('Hello World');
});

app.get('/metrics', async function(req, res) {
    res.set('Content-Type', register.ContentType);
    res.end(await register.metrics());
});

app.listen(3000);