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
    <iframe key={iframeReload} width="1000px" height="800px" src ='http://localhost:3002/public-dashboards/68ad5da15b214f7284feeec4e72be583' title='full dashboard'></iframe>
  </Fragment>
)};

export default Graphs;
