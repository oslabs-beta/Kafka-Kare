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

    <iframe width="1000px" height="800px" src="http://localhost:3002/public-dashboards/f34615ea1c0a4d5f86f7b90e9dbba246"></iframe>

    <iframe key={iframeReload} width="1000px" height="800px" src ='http://localhost:3002/public-dashboards/fc1bde4e782f41c0a17a58ebf7820a14' title='throughput'></iframe>

    <iframe  width="1000px" height="800px" src="http://localhost:3002/public-dashboards/c5c3b159fc804e52b99d97c7d13bf9b5" title='actually-throughput'></iframe>

    <iframe  width="1000px" height="800px" src="http://localhost:3002/public-dashboards/a6a3d9c6dcf34c06a8f4eb4a4025769b" title='elasticity'></iframe>


  </Fragment>
)};

export default Graphs;
