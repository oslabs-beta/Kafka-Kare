# Kafka-Kare
---------------INSERT KAFKA KARE LOGO HERE--------------------
<p align="center">
  <img src=" " width=500px>
</p>


## Table of Contents
1. About (#about-kafka-kare)
2. How it Works (#how-it-Works)
3. Getting Started (#getting-started-with-kafka-kare)
4. Roadmap
5. Contributors
6. License


## About Kafka Kare
In the complex landscape of Apache Kafka ecosystems, monitoring data streams and detecting anomalies can be challenging. Kafka Kare addresses this challenge by offering a user-friendly interface to visualize Kafka topics, partitions, consumer groups, and more. 

With built-in alerting mechanisms, it empowers users to proactively identify issues such as lagging consumers, high throughput, or unusual patterns, ensuring the reliability and performance of Kafka deployments.

Kafka Kare is an open-source web application designed to provide powerful visualization capabilities and real-time alerting functionalities for Apache Kafka environments. It offers seamless integration with Kafka clusters, allowing users to monitor data streams, visualize key metrics, and set up Slack alerts for critical events.

## How it Works
Kafka Kare is built with:
- Javascript
- Webpack
- Grafana
- Prometheus
- Next JS
- React
- Node.js
- Express 
- MongoDB
- KafkaJS
- Chakra UI

Kafka Kare's key features include:
  - With its plug-and-play functionality, Kafka Kare allows users to add cluster connections with their port numbers. 
  - Once connected, real-time visualization of 22 key Kafka cluster metrics such as consumer lag, overall health of the cluster, and latency are available via Grafana-generated dashboards that 
    are supported by Prometheus.
  - Additionally, the alerting system allows users to define custom alert rules based on various Kafka metrics and thresholds. When predefined conditions are met, the system triggers alerts via 
    Slack, enabling timely response to potential issues and ensuring the stability of Kafka infrastructures.
    
## Getting Started With Kafka Kare

1. Fork and clone this repository then open it on your code editor of choice.
   - If you don't have it installed already, please set up Docker. The Kafka Kare team uses Docker Desktop: https://www.docker.com/products/docker-desktop/
   - To use Kafka Kare, you must have a containerized Kafka cluster set up to expose JMX data.
   - ---------------- DO We want to include something like this below? ---------------
   - Our recommendation to use [Confluent's Kafka images](https://registry.hub.docker.com/r/confluentinc/cp-kafka) with the `KAFKA_OPTS` environmental variable to run the Prometheus [JMX 
      Exporter](https://github.com/prometheus/jmx_exporter) as a Java agent. Your cluster must also be set up using a Docker bridge network to allow a custom Prometheus container to connect. See 
     [here](https://github.com/Kafka-Kare/kafka-cluster) for working examples
2. Setup the .env file
   - Locate the **.env.example** file in the **root directory**. You will need to add your own JSON Web Token (JWT) secret key for security purposes: https://jwt.io/
   - Optional: If you would prefer to use Github or Google OAuth for your login, please fill in the corresponding ID and Secret Key in the .env file as well.
     
   ---------------------Add gif of setting up .env file--------------------
     
3. Build frontend image
```
docker build -f Dockerfile-ui -t kafka-kare-ui .
```

4. Build backend image
```
docker build -f Dockerfile-server -t kafka-kare-server .
```

3. Spin up application container
```
docker compose up -d
```

4. Change directory to /kafka-cluster
```
cd kafka-cluster
```

5. (First time running the application) Build kafka cluster image 
```
docker build -t dockerpromkafka:latest .
```

6. Spin up demo kafka-cluster container (demo Kafka-cluster container must be spun up after application container)
```
docker compose up -d
```

7. Run the consumer followed by producer script
```
node consumer.js
node producer.js
```

8. Log into Grafana account at locahost:3002
- Sign in with credentials admin/kafkakarepw

9. Visit application frontend at localhost:3000
- Enjoy


# Instructions to stop the application
1. Spin down application container
```
docker compose down
```

2. Change directory to /kafka-cluster
```
cd kafka-cluster
```

3. Spin down demo kafka-cluster container
```
docker compose down
```


# Authors
- Matt Konop <mattsterprogrammer@gmail.com>
- Allison Scott <allisonbscott97@gmail.com>
- Justin Lin <hozion612356@gmail.com>
- Ronal Garcia <josue_role@yahoo.com>
- Jules Mai <julesdmai@gmail.com>
