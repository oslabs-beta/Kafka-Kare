'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto'; //auto will import entire library
import Navbar from '../../components/index/navbar';
import { Select, Box } from '@chakra-ui/react';
import Graph from '../../components/graphs/graph';
// import { 
//   Chart as ChartJS,
//   CategoryScale,

// }

const Graphs = () => {
  const [selectedMetricId, setSelectedMetricId] = useState(null);

  const handleMetricChange = (e) => {
    const selectedMetricId = allMetrics[e.target.value];
    setSelectedMetricId(selectedMetricId);
  };

  useEffect(() => {
    if (typeof window !== 'undefined');
    window.scrollTo(0,0);
  }, [selectedMetricId]);
 

const allMetrics = {
  'Log Segment Size By Topic': 17,
  'Total Bytes In': 6,
  'Total Number of Partitions': 16,
  'Metadata Error Count':1,
  'Broker Disk Usage': 15,
  'JVM Memory Pool Bytes': 8,
  'Message Latency By Topic': 14,
  'Total CPU Process in Seconds': 7,
  'Total Messages Consumed Per Topic': 13,
  'Offline Partitions Count': 10,
  'Total Messages Produced Per Topic': 12,
  'Total Bytes Out': 5,
  'Under-Replicated Partitions Count': 11,
  'Consumer Lag': 3,
  'Active Controller Count': 9,
  'Total Failed Fetch Requests': 4,
  'Total Groups Rebalancing': 2,
};


  return (
    
    <Box>
    <Navbar />
    
      <Select left='200px' margin='20px' width='400px' placeholder='Customize Your Dashboard Metrics' onChange={handleMetricChange}>
        {Object.keys(allMetrics).map((metric) => (
          <option key={metric} value={metric}>
            {metric}
          </option>
        ))}
      </Select>
      {selectedMetricId && (
        <Graph selectedMetricId={selectedMetricId}></Graph>
      )}
     </Box>

  )
};


export default Graphs;