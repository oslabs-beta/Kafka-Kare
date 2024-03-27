import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AlertsByMetricGraph = ({ allMetrics }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (allMetrics && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      // Destroy existing chart instance if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
  
      // Create datasets from allMetrics object with initial values of 0
      const datasets = Object.keys(allMetrics).map((metric) => ({
        label: metric,
        data: Array(data.labels.length).fill(0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }));
  
      // Create new chart instance
      chartRef.current.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: datasets
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              stacked: true
            }
          }
        }
      });
    }
  }, [allMetrics]);
  

  return <canvas ref={chartRef} />;
};

export default AlertsByMetricGraph;


