# Kafka-Kare
A Kafka error handling visualizer 


# Instructions to start the application
1. Build frontend image
```console
docker build -f Dockerfile-ui -t kafka-kare-ui .
```

2. Build backend image
```console
docker build -f Dockerfile-server -t kafka-kare-server .
```

3. Spin up application container
```console
docker compose up -d
```

4. Change directory to /kafka-cluster
```console
cd kafka-cluster
```

5. Spin up demo kafka-cluster container (demo Kafka-cluster container must be spun up after application container)
```console
docker compose up -d
```

6. Log into Grafana account at locahost:3002
- Sign in with credentials admin/kafkakarepw

7. Visit application frontend at localhost:3000
- Enjoy


# Instructions to stop the application
1. Spin down application container
```console
docker compose down
```

2. Change directory to /kafka-cluster
```console
cd kafka-cluster
```

3. Spin down demo kafka-cluster container
```console
docker compose down
```


# Authors
- Matt Konop <mattsterprogrammer@gmail.com>
- Allison Scott <allisonbscott97@gmail.com>
- Justin Lin <hozion612356@gmail.com>
- Ronal Garcia <josue_role@yahoo.com>
- Jules Mai <julesdmai@gmail.com>