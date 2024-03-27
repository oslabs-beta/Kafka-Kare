'use client';

import React, { useEffect } from 'react';
import { Box, useToast, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { clustersStore } from '../../store/clusters';
import Navbar from '../../components/clusters/navbar';
import MainContainer from '../../components/clusters/mainContainer';
import LoadingModal from '../../components/loadingModal';
import { handleFetchClustersAndSlackWebhookURL } from '../../utils/clustersHandler';
/*
Cluster Page Structure:
  |-- clusters.jsx
      |-- navbar
          |-- searchInput
          |-- addClusterModal
          |-- accountMenu
              |-- changePasswordModal
              |-- deleteAccountModal
              |-- logoutModal
          |-- menuDrawer
      |-- mainContainer
          |-- clusterCard
          |-- deleteClusterModal
          |-- editClusterModal
*/
export default function Home() {

  // declare variable to use toast and push
  const { push } = useRouter();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  // declare state variables
  const renderClustersPage = clustersStore(state => state.renderClustersPage);

  // fetch clusters and slack webhook url before rendering page
  useEffect(() => {
    setTimeout(() => {clustersStore.setState({isLoadingModalOpen: false});}, 1500);
    clustersStore.setState({isLoadingModalOpen: true});
    console.log(colorMode);
    handleFetchClustersAndSlackWebhookURL(toast, push, colorMode, toggleColorMode);
  }, []);

  if (renderClustersPage) {
    return (
      <Box width='full' height='100vh'>
        <LoadingModal />

        {/* Navbar */}
        <Navbar colorMode={colorMode}  toggleColorMode={toggleColorMode}/>

        {/* Main Container */}
        <MainContainer />
      </Box>
    );
  }
}