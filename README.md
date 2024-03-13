# Kafka-Kare
A Kafka error handling visualizer 


# Instructions
1. Build frontend image
- docker build -f Dockerfile-ui -t kafka-kare-ui .

2. Build backend image
- docker build -f Dockerfile-server -t kafka-kare-server .

3. Spin up application container
- docker compose up -d

4. Change directory to /kafka-cluster
- cd kafka-cluster

5. Spin up demo kafka-cluster container
- docker compose up -d

6. Log into Grafana account
- Visit localhost:3002 and sign in with admin/kafkakarepw

7. Visit frontend at localhost:3000
- Enjoy


# Authors
- Matt Konop <mattsterprogrammer@gmail.com>
- Allison Scott <allisonbscott97@gmail.com>
- Justin Lin <hozion612356@gmail.com>
- Ronal Garcia <josue_role@yahoo.com>
- Jules Mai <julesdmai@gmail.com>