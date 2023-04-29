



### Start a container with Prometheus

```sh
docker run \
    --name prometheus \
    --rm \
    -d \
    -p 9090:9090 \
    # -v /home/eric/DevOps/Projects/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
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


Reference: https://github.com/siimon/prom-client#labels