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
    buckets: [0.1, 0.2, 0.3, 0.4, 0.5]
});

const summary = new promClient.Summary({
    name: 'class_summary_request_time_seconds',
    help: 'Time to response from API',
    percentiles: [0.01, 0.1, 0.5, 0.9, 0.99] // percentiles 1%, 10%, 50%, 90%, 99%
});


app.get('/', (req, res, next) => {
  counter.labels('200').inc();
  counter.labels('300').inc();
  gauge.set(100*Math.random());
  const time = Math.random();
  histogram.observe(time); // Observe value in histogram
  summary.observe(time);

  res.send('Hello World');
});

app.get('/metrics', async function(req, res) {
    res.set('Content-Type', register.ContentType);
    res.end(await register.metrics());
});

app.listen(3000);