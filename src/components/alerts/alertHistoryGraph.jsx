import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const AlertHistoryGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const labels = Array.from({ length: 30 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

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
        datasets: [
            {
              label: "Alerts Over Past 30 Days",
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "linear",
              text: "Day",
              ticks: { // Set the x-axis labels to the past 30 days
                callback: (value, index) => {
                  const date = new Date();
                  date.setDate(date.getDate() - (29 - index));
                  return date.toLocaleDateString(); 
                },
              },
            },
            y: {
              min: 0,         
              beginAtZero: true,
              text: "Number of Alerts",
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Number of Alerts From the Past 30 Days",
            },
          },
        },
      });
    }
  }, []);

  const generateZerosArray = (length) => {
    return Array.from({ length: length }, () => 0);
  };

  return <canvas ref={chartRef} />;
};

export default AlertHistoryGraph;

