# Kafka-Kare
A Kafka error handling visualizer 

## Description
Kafka Kare is a comprehensive monitoring solution designed to provide real-time insights into Kafka cluster health and performance. Our project bridges the gap between Kafka cluster metrics and actionable insights by delivering a user-friendly dashboard interface. We leverage Docker, Prometheus, and Grafana for metrics collection and visualization, with a robust backend built on Express and MongoDB, and a reactive frontend developed with React and the Zustand state management library.

## Key Features:
- Real-time Kafka Metrics: Visualize key performance indicators such as throughput, latency, and error rates in real-time.
- Custom Metrics Visualization: Move beyond Grafana with a direct Prometheus to Chart.js integration for more granular control over data presentation.
- User Management: Secure user authentication, profile management, and personalized dashboard settings.
- Responsive Design: A modern, responsive UI that ensures a seamless user experience across various devices.

## Tech Stack:
- Frontend: React, Zustand, Chart.js
- Backend: Node.js, Express, MongoDB
- Monitoring: Prometheus, Grafana
- Containerization: Docker

## Getting Started:
For detailed instructions on how to set up and run Kafka Kare Dashboard, please refer to our [Setup Guide](./docs/SETUP_GUIDE.md).

## Quick Start
Here's a quick overview to get you started:
1. Build the frontend and backend images.
2. Use `docker compose up-d` to spin up the application.
3. Navigate to `/kafka-cluster` and set up the demo Kafka cluster.
4. Visit the application frontend at `localhost:3000`.

For full details, including prerequisites and step-by-step instructions, please see the setup guide. 

## Contributing:
We welcome contributions! Whether it's feature requests, bug reports, or pull requests, your input helps us make Kafka Kare better for everyone.

## Roadmap: 
- Optimize Dockerfiles to copy only needed files

## Authors
- Matt Konop <mattsterprogrammer@gmail.com>
- Allison Scott <allisonbscott97@gmail.com>
- Justin Lin <hozion612356@gmail.com>
- Ronal Garcia <josue_role@yahoo.com>
- Jules Mai <julesdmai@gmail.com>