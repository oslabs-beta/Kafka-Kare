# Setup Guide

<!-- Include the below in our setup guide -->
## Instructions to start the application
1. Build frontend image
```
docker build -f Dockerfile-ui -t kafka-kare-ui .
```

2. Build backend image
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


## Instructions to stop the application
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

## Instructions to connect Slack Notifications
- For detailed instructions on how to set up and connect Slack notifications, please refer to our [Slack Setup Guide](./docs/SLACK_SETUP_GUIDE.md).