"use client";
import { Box, VStack, Link, Stack, Image, Icon, IconButton } from "@chakra-ui/react";
import NextLink  from "next/link";
import AccountMenu from "../clusters/navbar/accountMenu";
import MenuDrawer from "../clusters/navbar/menuDrawer";
import React, { useState } from "react";
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { clustersStore } from "../../store/clusters";


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
        {/* Logo */}
        <Image src='/kafka-kare-logo-v3-dark.png' mt={4} h={10} borderRadius={8} />
        <Link as={NextLink} href="/clusters">
          Home
        </Link>
        <Stack spacing="2" alignItems="center">
          <Box>
            <Link as={NextLink} ml={10} href="/dashboard">
              Dashboard
            </Link>
              <IconButton
                aria-label='open dashboard list' icon={<ChevronDownIcon />} variant='link'
                onClick={(toggleDashboardOptions)} color='white' 
              />
          </Box>
          {showDashboardOptions && (
          <Stack w={190} spacing="1" mt={1} pt={3} pb={3} pl={2} borderColor='white' borderWidth={2} borderRadius={4}>
            <Link as={NextLink} href="/dashboard">
              All Kafka Metrics
            </Link>
            <Link as={NextLink} href="/consumer-lag">
              Consumer Lag Analysis
            </Link>
            <Link as={NextLink} href="/cluster-health">
              Cluster Health Overview
            </Link>
          </Stack>
          )}
        </Stack>
        <Link as={NextLink} href="/alerts">
          Alerts
        </Link>
        {/* Open Menu Button */}
        <IconButton
          aria-label='open drawer' icon={<HamburgerIcon boxSize={6} color='white'/>} variant='outline' colorScheme="gray"
          onClick={() => clustersStore.setState({isDrawerOpen: true})} _hover={{ backgroundColor: 'whiteAlpha.400' }}
        />
        {/* Menu Drawer */}
        <MenuDrawer />
        <AccountMenu />
      </VStack>
    </Box>
  );
};

export default Navbar;

