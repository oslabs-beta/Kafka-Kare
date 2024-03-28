"use client";
import React, { useRef, useEffect, useState } from "react";
import Navbar from "../../components/index/navbar";
import { Select, Box, Button, Flex, Grid, Spacer } from "@chakra-ui/react";
import Graph from "../../components/graphs/graph";
import axios from 'axios';

const Dashboard = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [selectedMetricId, setSelectedMetricId] = useState([]);
  const [showFullDashboard, setShowFullDashboard] = useState(false);
  const [iFrameUrl, setIFrameUrl] = useState('');

  //function to handle choosing a metric from drop down list
  const handleMetricChange = (e) => {
    const selectedMetric = allMetrics[e.target.value];
    setSelectedMetricId([...selectedMetricId, selectedMetric]);
  };

  //function to handle removing a metric from custom dashboard
  const handleRemoveMetric = (metric) => {
    const updatedMetrics = selectedMetricId.filter((m) => m !== metric);
    setSelectedMetricId(updatedMetrics);
  };

  //function to toggle to the full dashboard view
  const handleFullDashboardClick = () => {
    setShowFullDashboard(!showFullDashboard);
  };

  useEffect(() => {
    if (typeof window !== "undefined")
    window.scrollTo(0, 0);
  }, [selectedMetricId]);

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

  //function to fetch iframe for full dashboard from backend
  useEffect(() => {
    const fetchIFrame = async () => {
      try {
        // If we can send the specific cluster Id as params, then this will function as expected
        // Need to modify iFrameController to use req.params
        const response = await axios.get('http://localhost:3001/iframe/123');
        console.log('response: ', response.data);
        const iFrame = response.data;        
        console.log('iframe: ', iFrame);
        setIFrameUrl(iFrame);
      } catch (error) {
        console.error('Error fetching full dashboard iFrame:', error);
      }
    };
    fetchIFrame(); 
  }, []);

  const allMetrics = {
    "Log Segment Size By Topic": 17,
    "Total Bytes In": 6,
    "Total Number of Partitions": 16,
    "Metadata Error Count": 1,
    "Broker Disk Usage": 15,
    "JVM Memory Pool Bytes": 8,
    "Message Latency By Topic": 14,
    "Total CPU Process in Seconds": 7,
    "Total Messages Consumed Per Topic": 13,
    "Offline Partitions Count": 10,
    "Total Messages Produced Per Topic": 12,
    "Total Bytes Out": 5,
    "Under-Replicated Partitions Count": 11,
    "Consumer Lag": 3,
    "Active Controller Count": 9,
    "Total Failed Fetch Requests": 4,
    "Total Groups Rebalancing": 2,
    "Consumer Group Partition Lag": 21,
    "Consumer Group Maxiumum Lag": 18,
    "Consumer Group Current Offset": 22,
    "Consumer Group Lag in Seconds": 23,
    "Consumer Group Partition Assignment Strategy": 24
  };

  return (
    <Box h="100vh" w="100vw" overflow="hidden">
      <Navbar />
      <Box textAlign="center" w="calc(100% - 200px)" ml={200}>
        {/* <Flex alignItems="center" justifyContent="center" flexDirection="column"> */}
        <Flex alignItems="center" width="100%">
          <Spacer />
          <Select
            m={10}
            w={400}
            placeholder="Customize Your Dashboard Metrics"
            onChange={handleMetricChange}
            style={{ border: "2px solid teal" }}
            isDisabled={showFullDashboard}
          >
            {Object.keys(allMetrics).map((metric) => (
              <option key={metric} value={metric}>
                {metric}
              </option>
            ))}
          </Select>
          <Button
            margin="20px"
            colorScheme="teal"
            onClick={handleFullDashboardClick}
            width="190px"
          >
            {showFullDashboard ? 'Close' : 'See'} Full Dashboard
          </Button>
          <Spacer />
        </Flex>
      </Box>
      {showFullDashboard && (
      <iframe
        // src="http://localhost:3002/public-dashboards/f489745f6dfa4a138641169652f668be"
        src={iFrameUrl}
        className="full-dashboard"
      ></iframe>)}
      <Grid
        overflowY="auto"
        ml={200}
        px={10}
        h={`calc(100% - ${windowWidth < 765 ? 180 : windowWidth < 895 ? 200 : 140}px)`}
        w="calc(100% - 200px)"
        templateColumns="repeat(auto-fit, minmax(400px, 1fr))"
        gap={10}
      >
        {selectedMetricId.map((metric, index) => (
        <Graph
          key={`${metric}${index}`}
          selectedMetricId={metric}
          onRemove={() => handleRemoveMetric(metric)}
          showFullDashboard={showFullDashboard}
        />))}
      </Grid>
    </Box>
  );
};

export default Dashboard;


