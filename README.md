



### Iniciando oum container com o Prometheus

```sh
docker run \
    --name prometheus \
    --rm \
    -d \
    -p 9090:9090 \
    # -v /home/eric/DevOps/Projects/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus
```
