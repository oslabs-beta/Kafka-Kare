import React, { Fragment, useEffect, useState } from 'react';

const Graphs = () => {

  const [iframeReload, setIframeReload] = useState(1);
  
  // useEffect(() => {
  //   const fetchGrafanaDashboard = setInterval(() => {
  //     setIframeReload(iframeReload+1);
  //   }, 5000);
  // }, [])

  return(
  <Fragment>
    {/* <Grid item flexBasis={'29vh'}>
          <iframe src="http://localhost:3000/d-solo/AdG9A1xmk/kafka-brokers-jvm-and-os?orgId=1&refresh=5s&panelId=1"></iframe>
    </Grid> */}
    <iframe src='http://localhost:3000/home' title='home page'></iframe>

    <iframe key={iframeReload} width="1000px" height="800px" src ='http://localhost:3002/public-dashboards/fc1bde4e782f41c0a17a58ebf7820a14' title='throughput'></iframe>

  </Fragment>
)};

export default Graphs;
