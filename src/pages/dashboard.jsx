import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto'; //auto will import entire library
import Navbar from '../components/index/navbar';
import { Select, Box } from '@chakra-ui/react';
import Graph from '../components/graphs/graph';
// import { 
//   Chart as ChartJS,
//   CategoryScale,

// }

const Graphs = () => {
  const [selectedMetric, setSelectedMetric] = useState(null);

  const handleMetricChange = (e) => {
    const selectedMetricId = allMetrics(e.target.value);
    setSelectedMetric(selectedMetricId);
  };

  useEffect(() => {
    if (typeof window !== 'undefined');
    window.scrollTo(0,0);
  }, [selectedMetric]);
  //Ref for storing the chart instance
  const chartRef = useRef(null);

  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  useEffect(() => { 
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }
  const bytesInGraph = new Chart(
    document.getElementById('bytesInGraph'),
    {
      type: 'line',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Bytes in',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  )
});

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
    
    <div>
    <Navbar />
    <Box>
      <Select placeholder='Customize Your Dashboard Metrics' onChange={handleMetricChange}>
        {Object.keys(allMetrics).map((metric) => (
          <option key={metric} value={metric}>
            {metric}
          </option>
        ))}
      </Select>
      {selectedMetric && (
        <Graph></Graph>
      )}
      <h1 className="w-[110px] mx-auto mt-10 text-xl font-semibold capitalize ">Bytes In Per Second</h1>
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
          <canvas id='bytesInGraph'></canvas>
        </div>
      </div>
    </Box>
    </div>
  )
};




export default Graphs;
