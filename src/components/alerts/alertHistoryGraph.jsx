import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AlertHistoryGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const labels = generatePast30DaysLabels();
    const data = generateZerosArray(30);
    
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      // Destroy existing chart instance if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
  
      // Create new chart instance
      chartRef.current.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Alerts Over Past 30 Days',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              ticks: {
                stepSize: 1,
                beginAtZero: true
              }
            },
            y: {
              min: 1, 
              max: 100, 
              beginAtZero: false
            }
          }
        }
      });
    }
  }, []);
  

  //received an error after trying to use a date adapter so will have to settle for hard coded 1-30 for now
  const generatePast30DaysLabels = () => {
    const labels = [];
    for (let i = 29; i >= 0; i--) {
      labels.push(i);
    }
    return labels;
  };
  

  const generateZerosArray = (length) => {
    return Array.from({ length: length }, () => 0);
  };

  return <canvas ref={chartRef} />;
};

export default AlertHistoryGraph;

