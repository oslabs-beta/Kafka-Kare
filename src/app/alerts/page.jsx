"use client";
import React, { useState } from "react";
import Navbar from "../../components/index/navbar";
import ConfigureCustom from "../../components/alerts/configureCustom";
import AlertHistoryGraph from '../../components/alerts/alertHistoryGraph';
import AlertsByMetricGraph from '../../components/alerts/alertsByMetricGraph';
import { Button, Heading, Flex, Box } from "@chakra-ui/react";

const Alerts = () => {
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
    "Consumer Group Partition Assignment Strategy": 24,
  };

  const lineGraphData = {
    labels: ['2024-02-01', '2024-02-02', '2024-02-03', '2024-02-04', '2024-02-05'],
    values: [10, 20, 15, 25, 30] // Example values for each day
  };


  const barGraphData = {
    labels: ['Metric 1', 'Metric 2', 'Metric 3'],
    datasets: [
      {
        label: 'Alerts',
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
        data: [15, 25, 20] 
      }
    ]
  };

  const [selectedMetricId, setSelectedMetricId] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [minThresholds, setMinThresholds] = useState(
    Array(Object.keys(allMetrics).length).fill("")
  );
  const [maxThresholds, setMaxThresholds] = useState(
    Array(Object.keys(allMetrics).length).fill("")
  );
  const [alerts, setAlerts] = useState([]);

  //   // Function to handle opening the configure custom alerts modal
  //   const openModal = () => {
  //     setIsOpen(true);
  //   };

  //   // Function to handle closing the configure custom alerts modal
  //   const closeModal = () => {
  //     setIsOpen(false);
  //   };

  const openCloseCustomAlerts = () => {
    setIsOpen(!isOpen);
  };

  const removeAlert = (indexToRemove) => {
    const updatedMinThresholds = [...minThresholds];
    const updatedMaxThresholds = [...maxThresholds];
    updatedMinThresholds.splice(indexToRemove, 1);
    updatedMaxThresholds.splice(indexToRemove, 1);
    setMinThresholds(updatedMinThresholds);
    setMaxThresholds(updatedMaxThresholds);
  };

  const saveAlerts = () => {
    console.log("alerts");
  };

  return (
    <Box ml={210} mr={10}>
      <Navbar />
      <Flex flexDirection="column" alignItems="center">
        <Heading
          as="h1"
          fontWeight="900"
          fontFamily="Tahoma"
          color="gray.800"
          size="3xl"
        >
          Alerts
        </Heading>
        <Button colorScheme="teal" onClick={openCloseCustomAlerts} mt={4}>
          {isOpen ? "Hide Custom Alerts" : "Configure Custom Alerts"}
        </Button>
      </Flex>
      {isOpen && (
        <ConfigureCustom
          allMetrics={allMetrics}
          minThresholds={minThresholds}
          setMinThresholds={setMinThresholds}
          maxThresholds={maxThresholds}
          setMaxThresholds={setMaxThresholds}
          removeAlert={removeAlert}
          saveAlerts={saveAlerts}
        />
      )}
      <div>
        <Heading
          textAlign="center"
          as="h2"
          fontWeight="900"
          fontFamily="Tahoma"
          color="gray.800"
          size="2xl"
        >
          Alert Details
        </Heading>
        {alerts.length === 0 ? (
          <p style={{ textAlign: "center", margin: "20px" }}>No alerts, you are all clear!</p>
        ) : (
          <div>{/* coming soon: Display alerts */}</div>
        )}
      </div>
      <div>
        <Heading
          textAlign="center"
          as="h2"
          fontWeight="900"
          fontFamily="Tahoma"
          color="gray.800"
          size="2xl"
        >
          Alert History
        </Heading>
        <AlertHistoryGraph data={lineGraphData} />
        <AlertsByMetricGraph data ={barGraphData} />
      </div>
    </Box>
  );
};

export default Alerts;
