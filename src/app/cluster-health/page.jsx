"use client"

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/index/navbar';
import { Heading, Box, Grid, GridItem } from '@chakra-ui/react';

const ClusterHealth = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  // update the window width
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // useEffect to run the handleResize function on window resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clusterHealthMetrics = [
    { title: 'Broker Disk Usage', panelId: 15 },
    { title: 'JVM Memory Pool Bytes', panelId: 8 },
    { title: 'Offline Partitions Count', panelId: 10 },
    { title: 'Under Replicated Partitions Count', panelId: 11 },
    { title: 'Active Controller Count', panelId: 9 },
    { title: 'Total Failed Fetch Requests', panelId: 4 },
  ];

  const renderMetric = (metric) => (
    <GridItem key={metric.title}>
      <iframe
        src={`http://localhost:3002/d-solo/cdgganhpqspvkd/kafka-kare-dashboard?orgId=1&from=1711110287064&to=1711131887064&panelId=${metric.panelId}`}
        className="health-metric"
        title={metric.title}
      />
    </GridItem>
  );

  return (
  <Box h="100vh" w="100vw" overflow="hidden">
    <Navbar/>
    <Box ml={200} textAlign="center" mt={8} mb={10} w="calc(100% - 200px)">
      <Heading as="h1" fontWeight="900" fontFamily="Tahoma" color="gray.800" size="3xl" justify-content="center">Cluster Health</Heading>
    </Box>
    <Grid overflowY="auto" ml={200} px={10} h={`calc(100% - ${windowWidth < 548 ? 180 : 140}px)`} w="calc(100% - 200px)" templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={10} className="consumer-health-container">
      {clusterHealthMetrics.map(renderMetric)}
    </Grid>
  </Box>
)};

export default ClusterHealth;