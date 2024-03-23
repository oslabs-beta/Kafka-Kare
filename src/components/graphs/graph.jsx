import React from 'react';

function Graph({ selectedMetric }) {
    return (
      <>
          <iframe src={`http://localhost:3002/d-solo/cdgganhpqspvkd/kafka-kare-dashboard?orgId=1&from=1711110287064&to=1711131887064&panelId=${id}`}
          width="450" height="200" frameborder="0"></iframe>
      </>
    );
  }
  
  export default Graph;

  //public full dashboard url if we need it: 
  // http://localhost:3000/public-dashboards/f489745f6dfa4a138641169652f668be