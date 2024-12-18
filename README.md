# Projector HSA Home work #2: Resource Monitoring

## To run the project:

```bash
$ docker-compose up
```

## To run load test scripts:

### MongoDB

```bash
chmod +x ./scripts/load-mongodb.sh
./scripts/load-mongodb.sh
```

### Elasticsearch

```bash
chmod +x ./scripts/load-elasticsearch.sh
./scripts/load-elasticsearch.sh
```

### API

```bash
chmod +x ./scripts/load-api.sh
./scripts/load-api.sh
```

### Results of the load is in the `./scripts/results` folder
