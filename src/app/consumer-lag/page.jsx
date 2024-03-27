"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/index/navbar';
import { Box, Heading, Grid, GridItem } from '@chakra-ui/react';

const ConsumerLag = () => {
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

  const consumerLagMetrics = [
    { title: 'Consumer Lag', panelId: 3 },
    { title: 'Consumer Group Partition Lag', panelId: 21 },
    { title: 'Consumer Group Maxiumum Lag', panelId: 18 },
    { title: 'Consumer Group Current Offset', panelId: 22 },
    { title: 'Consumer Group Lag in Seconds', panelId: 23 },
    { title: 'Consumer Group Partition Assignment Strategy', panelId: 24 },
  ];

  const renderMetric = (metric) => (
    <GridItem key={metric.title} w="100%" justifyContent="center">
      <iframe
        src={`http://localhost:3002/d-solo/cdgganhpqspvkd/kafka-kare-dashboard?orgId=1&from=1711110287064&to=1711131887064&panelId=${metric.panelId}`}
        className="lag-metric"
        title={metric.title}
      />
    </GridItem>
  );

  return (
  <Box h="100vh" w="100vw" overflow="hidden">
    <Navbar/>
    <Box ml={200} textAlign="center" mt={8} mb={10} w="calc(100% - 200px)">
      {/* Tahoma, Trebuchet MS, Georgia, Courier New */}
      <Heading as="h1" fontWeight="900" fontFamily="Tahoma" color="gray.800" size="3xl" justify-content="center">Consumer Lag Analysis</Heading>
    </Box>
    <Grid overflowY="auto" ml={200} px={10} h={`calc(100% - ${windowWidth < 765 ? 180 : windowWidth < 895 ? 200 : 140}px)`} w="calc(100% - 200px)" templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={10} className="consumer-lag-container">
      {consumerLagMetrics.map(renderMetric)}
    </Grid>
  </Box>
)};

export default ConsumerLag;