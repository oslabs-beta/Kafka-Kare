import React, { Fragment } from 'react';

const Graphs = () => {

  return(
  <Fragment>
    <iframe className='dashboard' width="100%" style={{height: "100vh"}} src ='http://localhost:3002/public-dashboards/68ad5da15b214f7284feeec4e72be583' title='full dashboard'></iframe>
    <iframe className='dashboard2' width="100%" style={{height: "100vh"}} src ='http://localhost:3002/public-dashboards/749747b2489244f498febb50cd40e256' title='full dashboard'></iframe>
    {/* <iframe src ='http://localhost:3002/public-dashboards/767b1fba863549f1b755fe98098fc3de' title='scrape metrics'></iframe> */}
  </Fragment>
)};

export default Graphs;
