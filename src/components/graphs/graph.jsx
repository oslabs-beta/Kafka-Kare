import React, { useEffect, useState } from "react";
import { GridItem, Button } from "@chakra-ui/react";

const Graphs = ({ selectedMetricId, onRemove, showFullDashboard, iFrameUrl }) => {
  console.log('iFrameUrl: ', iFrameUrl); // testing
  
  return (
    <>
    {!showFullDashboard && (
      <GridItem className="graph-container" maxW={500} maxH={350}>
        <iframe
          src={`${iFrameUrl}&viewPanel=${selectedMetricId}`}
          // src={`http://localhost:3002/d-solo/cdgganhpqspvkd/kafka-kare-dashboard?orgId=1&from=1711110287064&to=1711131887064&panelId=${selectedMetricId}`}
          className="graph"
        ></iframe>
        <Button
          onClick={onRemove} colorScheme="red" size="md" w="100%" h={10} maxWidth={500}
          borderTopRightRadius={0} borderTopLeftRadius={0} borderBottomRightRadius={15} borderBottomLeftRadius={15}
        >
          Remove
        </Button>
      </GridItem>
      )}
    </>
  );
};

export default Graphs;
