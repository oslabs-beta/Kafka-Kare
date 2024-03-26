  import React, { Fragment } from 'react';
  
  const Grafana = () => {

    return(
        <Fragment>
          <iframe className='dashboard' width="100%" style={{height: "100vh"}} src ='http://localhost:3002/public-dashboards/dd11a6892a064abcb2a4fb5966cea322' title='full dashboard'></iframe>
          {/* <iframe src ='http://localhost:3002/public-dashboards/767b1fba863549f1b755fe98098fc3de' title='scrape metrics'></iframe> */}
        </Fragment>
      )};
  
export default Grafana;
  
 