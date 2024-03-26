import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

const Graphs = ({ selectedMetricId, onRemove, showFullDashboard }) => {
  return (
    <>
    {!showFullDashboard && (
      <div className="graph-container">
        <iframe
          src={`http://localhost:3002/d-solo/cdgganhpqspvkd/kafka-kare-dashboard?orgId=1&from=1711110287064&to=1711131887064&panelId=${selectedMetricId}`}
          className="graph"
          frameborder="0"
        ></iframe>
        <Button onClick={onRemove} colorScheme="red" size="xs">
          Remove
        </Button>
      </div>
      )}
    </>
  );
};

export default Graphs;
