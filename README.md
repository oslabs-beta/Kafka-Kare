# Kafka-Kare

<p align="center">
  <img src="./public/kafka-kare-logo-v2.png" width=500px>
</p>


## Table of Contents
1. [About](#about-kafka-kare)
2. [How it Works](#how-it-works)
3. [Getting Started](#getting-started-with-kafka-kare)
4. [Interested in Contributing?](#interested-in-contributing)
5. [Meet the Team](#meet-the-team)
6. [License](#license)


## About Kafka Kare
In the complex landscape of Apache Kafka ecosystems, monitoring data streams and detecting anomalies can be challenging. Kafka Kare addresses this challenge by offering a user-friendly interface to visualize Kafka topics, partitions, consumer groups, and more. 

With built-in alerting mechanisms, it empowers users to proactively identify issues such as lagging consumers, high throughput, or unusual patterns, ensuring the reliability and performance of Kafka deployments.

Kafka Kare is an open-source web application designed to provide powerful visualization capabilities and real-time alerting functionalities for Apache Kafka environments. It offers seamless integration with Kafka clusters, allowing users to monitor data streams, visualize key metrics, and set up Slack alerts for critical events.

## How it Works
Kafka Kare is built with:

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://www.javascript.com/)
[![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)](https://kafka.apache.org/)
[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/html5/)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Chakra UI](https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)](https://chakra-ui.com/)
[![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)](https://prometheus.io/)
[![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white)](https://grafana.com/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Chart.js](https://img.shields.io/badge/Chart%20js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)


Kafka Kare's key features include:
  - With its plug-and-play functionality, Kafka Kare allows users to add cluster connections with their port numbers. 
  - Once connected, real-time visualization of 22 key Kafka cluster metrics such as consumer lag, overall health of the cluster, and latency are available via Grafana-generated dashboards that 
    are supported by Prometheus.
  - Additionally, the alerting system allows users to define custom alert rules based on various Kafka metrics and thresholds. When predefined conditions are met, the system triggers alerts via 
    Slack, enabling timely response to potential issues and ensuring the stability of Kafka infrastructures.

Read more about our build process on Medium, here!   
    
## Getting Started With Kafka Kare

1. Fork and clone this repository then open it on your code editor of choice.
   - If you don't have it installed already, please set up Docker. The Kafka Kare team uses Docker Desktop: https://www.docker.com/products/docker-desktop/
   - To use Kafka Kare, you must have a containerized Kafka cluster set up to expose JMX data.
   - You can use [Confluent's Kafka images](https://registry.hub.docker.com/r/confluentinc/cp-kafka) with the `KAFKA_OPTS` environmental variable to run the Prometheus [JMX 
      Exporter](https://github.com/prometheus/jmx_exporter) as a Java agent. Your cluster should also be set up using a Docker bridge network to allow the Prometheus container to connect. See 
     [here](https://github.com/oslabs-beta/Kafka-Kare/tree/main/kafka-cluster) for an example.
2. Setup the .env file
   - Locate the **.env.example** file in the **root directory**. You will need to add your own JSON Web Token (JWT) secret key for security purposes: https://jwt.io/
   - You will also need to set up your own Next Auth URL and secret key for security purposes: https://next-auth.js.org/configuration/options
   - Optional: If you would prefer to use Github or Google OAuth for your login, please fill in the corresponding ID and Secret Key in the .env file as well.
     
<p align="center">
  <img src="./public/kafkaKare-creatingEnvfile.gif" alt="create .env file" width="">
</p>
     
3. Spin up the application container by running the below command:
```
docker compose up -d
```
<p align="center">
  <img src="./public/kafkakare-dockercomposeup-d.gif" alt="create .env file" width="">
</p>


### New to Kafka? Use steps 1 - 5 below to play around with our demo Kafka cluster!

  _1. Change directory to /kafka-cluster_
  ```
  cd kafka-cluster
  ```

  _2. (First time running the application) Build kafka cluster image_
  ```
  docker build -t dockerpromkafka:latest .
  ```

  _3. Spin up demo kafka-cluster container (demo Kafka-cluster container must be spun up after application container)_
  ```
  docker compose up -d
  ```

  _4. Run the consumer followed by producer script_
  ```
  node consumer.js
  node producer.js
  ```
  _5. Congratulations! You just set up your first Kafka cluster!_
     
     
4. Visit localhost:3000, create an account or log in. Click the 'Add Cluster' button, enter in the port number of your cluster, then click the dashboard button to start viewing your metrics!
5. Click the 3 lines to enter in your Slack URL and head to the Alerts page to configure your custom alerting thresholds.
6. Enjoy!

<p align="center">
  <img src="./public/kafkakareAddingcluster.gif" alt="create .env file" width="">
</p>

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
## Interested in Contributing?
Now seeking contributors to join the Kafka Kare team!

### How to Contribute 

To start contributing, please fork and clone Kafka Kare, create a feature branch with the pattern "(issue or feature)/what-you-are-working-on". 

When you are ready to submit a pull request to the **dev branch**, please follow the checklist closely and request at least two people to review and approve your code. You can refer to the Kafka Kare team members [here](#meet-the-team).

Prioritize any linked issues first before tackling the roadmap features and feel free to add any roadmap features as well that will continue to bring value to developers! We appreciate your support!

### Roadmap

| Feature                                                                               | Status    |
|---------------------------------------------------------------------------------------|-----------|
| Ability to plug in Kafka cluster to app                                               | ✅        |
| Metrics visualization with Grafana                                                    | ✅        |
| Save custom dashboard for users                                                       | ⏳        |
| Save historical data                                                                  | ⏳        |
| Alert history                                                                         | ⏳        |
| Custom notification configuration                                                     | 🙏🏻        |
| Migrate to KRaft                                                                      | 🙏🏻        |
| Shared state between any component shortcode                                          | 🙏🏻        |

- ✅ = Ready to use
- ⏳ = In progress
- 🙏🏻 = Looking for contributors

# Meet the Team!
<table>
  <tr>
    <td align="center">
      <img src="https://github.com/AllisonScott97.png"140px;" alt="profile picture of allison"/>
      <br />
      <sub><b>Allison Scott</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/allisonscott01/">🖇️</a>
      <a href="https://github.com/AllisonScott97">🐙</a>
    </td>
    <td align="center">
      <img src="https://github.com/MattKonop.png" width="140px;" alt="profile picture of matt"/>
      <br />
      <sub><b>Matt Konop</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/matt-konop-58a82b189/">🖇️</a>
      <a href="https://github.com/MattKonop">🐙</a>
    </td>
    <td align="center">
      <img src="https://github.com/JustinTzHLin.png" width="140px;" alt="profile picture of justin"/>
      <br />
      <sub><b>Justin Lin</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/justin-tzuhung-lin">🖇️</a>
      <a href="https://github.com/JustinTzHLin">🐙</a>
    </td>
     <td align="center">
      <img src="https://github.com/julesdmai.png" width="140px;" alt="profile picture of jules"/>
      <br />
      <sub><b>Jules Mai</b></sub>
      <br />
      <a href="http://www.linkedin.com/in/julesmai">🖇️</a>
      <a href="https://github.com/julesdmai">🐙</a>
    </td>
     <td align="center">
      <img src="https://github.com/josuerole.png" width="140px;" alt="profile picture of ronal"/>
      <br />
      <sub><b>Ronal Garcia</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/ronalgarcia/">🖇️</a>
      <a href="https://github.com/josuerole">🐙</a>
    </td>
</table>


- 🖇️ = LinkedIn
- 🐙 = Github

## License
This product is licensed under the MIT License without restriction.

