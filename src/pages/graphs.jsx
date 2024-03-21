import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto'; //auto will import entire library
// import { 
//   Chart as ChartJS,
//   CategoryScale,

// }

const Graphs = () => {
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


  return (
    <>
      <h1 className="w-[110px] mx-auto mt-10 text-xl font-semibold capitalize ">Bytes In Per Second</h1>
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
          <canvas id='bytesInGraph'></canvas>
        </div>
      </div>
    </>
  )
};


//   return(
//   <Fragment>
//     <iframe className='dashboard' width="100%" style={{height: "100vh"}} src ='http://localhost:3002/public-dashboards/dd11a6892a064abcb2a4fb5966cea322' title='full dashboard'></iframe>
//     {/* <iframe src ='http://localhost:3002/public-dashboards/767b1fba863549f1b755fe98098fc3de' title='scrape metrics'></iframe> */}
//   </Fragment>
// )};

export default Graphs;
