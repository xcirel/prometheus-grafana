



### Start a container with Prometheus

```sh
docker run \
    --name prometheus \
    --rm \
    -d \
    -p 9090:9090 \
    prom/prometheus
```



### Added a Application to Prometheus

In this example we work with a node application, see on ***app*** folder.



### Added a Gauge Metric
Can increase or decrease arbitrarily

```js
const gauge = new promClient.Gauge({
    name: 'class_free_bytes',
    help: 'Example of gauge'
});

gauge.set(100*Math.random());
```

### Added a Histogram Metric
Used to measure the distribution

```js
const histogram = new promClient.Histogram({
    name: 'class_request_time_seconds',
    help: 'Time to response from API',
    buckets: [0.1, 0.2, 0.3, 0.4, 0.5],
});

histogram.observe(Math.random()); // Observe value in histogram
```

### Added a Summary Metric
Used to measure the distribution with percentiles

```js
const summary = new promClient.Summary({
    name: 'class_summary_request_time_seconds',
    help: 'Time to response from API',
    percentiles: [0.01, 0.1, 0.5, 0.9, 0.99] // percentiles 1%, 10%, 50%, 90%, 99%
});

summary.observe(time);
```




Reference: https://github.com/siimon/prom-client#labels