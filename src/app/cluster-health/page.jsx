import React from 'react';
import Navbar from '../../components/index/navbar';
import { Heading, Box } from '@chakra-ui/react';

const ClusterHealth = () => {

    const clusterHealthMetrics = [
        { title: 'Broker Disk Usage', panelId: 15 },
        { title: 'JVM Memory Pool Bytes', panelId: 8 },
        { title: 'Offline Partitions Count', panelId: 10 },
        { title: 'Under Replicated Partitions Count', panelId: 11 },
        { title: 'Active Controller Count', panelId: 9 },
        { title: 'Total Failed Fetch Requests', panelId: 4 },
      ];

      const renderMetric = (metric) => (
        <iframe
          key={metric.title}
          src={`http://localhost:3002/d-solo/cdgganhpqspvkd/kafka-kare-dashboard?orgId=1&from=1711110287064&to=1711131887064&panelId=${metric.panelId}`}
          className="health-metric"
          title={metric.title}
          frameborder="0"
        />
      );

    return (
    <div>
        <Navbar/>
        <Box ml={200} textAlign="center" mb={40}>
        <Heading as="h1" size="lg" justify-content="center">Cluster Health</Heading>
        </Box>
        <div className="cluster-health-container">
            {clusterHealthMetrics.map(renderMetric)}
        </div>
    </div>
)};

export default ClusterHealth;