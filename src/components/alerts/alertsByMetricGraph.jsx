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
  
      // Create datasets from allMetrics object with initial values of 0 and random colors and border
      const datasets = Object.keys(allMetrics).map((metric, index) => ({
        label: metric,
        data: Array(Object.keys(allMetrics).length).fill(0),
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`,
        borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
        borderWidth: 1
      }));
  
      // Create new chart instance
      chartRef.current.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(allMetrics),
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
          },
          plugins: {
            title: {
              display: true,
              text: 'All Time Number of Alerts by Metric'
            }
          }
        }
      });
    }
  }, [allMetrics]);
  

  return <canvas ref={chartRef} />;
};

export default AlertsByMetricGraph;


