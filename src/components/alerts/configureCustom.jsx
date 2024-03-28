import React from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

const ConfigureCustom = ({
  allMetrics,
  minThresholds,
  setMinThresholds,
  maxThresholds,
  setMaxThresholds,
  removeAlert,
  saveAlerts,
}) => {

  return (
    <Box mt={4}>
      <Heading as="h2" size="lg" mb={2}>
        Configure Custom Alerts
      </Heading>
      {Object.keys(allMetrics).map((metric, index) => (
        <Box key={index} mb={4}>
          <Text fontWeight="bold">{metric}</Text>
          <Input
            type="text"
            placeholder="Min Threshold"
            value={minThresholds[index] || ""}
            onChange={(e) => {
              const updatedThresholds = [...minThresholds];
              updatedThresholds[index] = e.target.value;
              setMinThresholds(updatedThresholds);
            }}
          />
          <Input
            type="text"
            placeholder="Max Threshold"
            value={maxThresholds[index] || ""}
            onChange={(e) => {
              const updatedThresholds = [...maxThresholds];
              updatedThresholds[index] = e.target.value;
              setMaxThresholds(updatedThresholds);
            }}
          />
          <Button
            colorScheme="red"
            size="sm"
            onClick={() => removeAlert(index)}
            mt={2}
          >
            Remove Alert
          </Button>
        </Box>
      ))}
      <Button colorScheme="blue" onClick={saveAlerts}>Save Alerts</Button>
    </Box>
  );
};

export default ConfigureCustom;

