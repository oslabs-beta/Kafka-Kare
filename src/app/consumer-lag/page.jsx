import React from 'react';
import Navbar from '../../components/index/navbar';
import { Box, Heading } from '@chakra-ui/react';

const ConsumerLag = () => {

    const consumerLagMetrics = [
        { title: 'Consumer Lag', panelId: 3 },
        { title: 'Consumer Group Partition Lag', panelId: 21 },
        { title: 'Consumer Group Maxiumum Lag', panelId: 18 },
        { title: 'Consumer Group Current Offset', panelId: 22 },
        { title: 'Consumer Group Lag in Seconds', panelId: 23 },
        { title: 'Consumer Group Partition Assignment Strategy', panelId: 24 },
      ];
// Allison, can you push the repo?

      const renderMetric = (metric) => (
        <iframe
          key={metric.title}
          src={`http://localhost:3002/d-solo/cdgganhpqspvkd/kafka-kare-dashboard?orgId=1&from=1711110287064&to=1711131887064&panelId=${metric.panelId}`}
          className="lag-metric"
          title={metric.title}
          frameborder="0"
        />
      );

    return (
    <Box h="100vh" w="100vw" overflow="hidden">
        <Navbar/>
        <Box ml={200} textAlign="center" mb={20} w="calc(100% - 200px)">
            <Heading as="h1" size="lg" justify-content="center">Consumer Lag Analysis</Heading>
        </Box>
        <div className="consumer-lag-container" px={2}>
            {consumerLagMetrics.map(renderMetric)}
        </div>
    </Box>
)};

export default ConsumerLag;