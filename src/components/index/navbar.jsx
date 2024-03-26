"use client";
import { Box, Link as ChakraLink, VStack, Stack } from "@chakra-ui/react";
import Link from "next/link";
import AccountMenu from "../clusters/navbar/accountMenu";
import React, { useState } from "react";


const Navbar = () => {
  const [showDashboardOptions, setShowDashboardOptions] = useState(false);

  const toggleDashboardOptions = () => {
    setShowDashboardOptions(!showDashboardOptions);
  }

  return (
    <Box
      position="fixed"
      left="0"
      top="0"
      bottom="0"
      width="200px"
      backgroundColor="gray.800"
      color="white"
      paddingY="4"
      paddingX="2"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <VStack spacing="6">
        <Link href="/clusters" passHref>
          <ChakraLink>Home</ChakraLink>
        </Link>
        <Stack spacing="2">
          <Link href="/dashboard" passHref>
            <ChakraLink onClick={toggleDashboardOptions}>Dashboard</ChakraLink>
          </Link>
          {showDashboardOptions && (
          <Stack spacing="1" pl="4">
            <Link href="/dashboard" passHref>
              <ChakraLink>All Kafka Metrics</ChakraLink>
            </Link>
            <Link href="/consumer-lag" passHref>
              <ChakraLink>Consumer Lag Analysis</ChakraLink>
            </Link>
            <Link href="/cluster-health" passHref>
              <ChakraLink>Cluster Health Overview</ChakraLink>
            </Link>
          </Stack>
          )}
        </Stack>
        <Link href="/alerts" passHref>
          <ChakraLink>Alerts</ChakraLink>
        </Link>
        <AccountMenu></AccountMenu>
      </VStack>
    </Box>
  );
};

export default Navbar;

