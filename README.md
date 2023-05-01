### Start a container with Prometheus

```sh
docker run \
    --name prometheus \
    --rm \
    -d \
    -p 9090:9090 \
    prom/prometheus
```



## Monitoring an Application with Prometheus
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

Links
https://prometheus.io/docs/instrumenting/clientlibs/
https://github.com/siimon/prom-client#labels


## Monitoring Servers with Prometheus
Install ***node_exporter*** on server for registrer metrics

```yaml
version: '3.8'

services:
  node_exporter:
    image: quay.io/prometheus/node-exporter:latest
    container_name: node_exporter
    command:
      - '--path.rootfs=/host'
    network_mode: bridge
    restart: unless-stopped
    volumes:
      - '/:/host:ro,rslave'     
    ports:
      - 9100:9100
```





Links
https://prometheus.io/docs/instrumenting/exporters/