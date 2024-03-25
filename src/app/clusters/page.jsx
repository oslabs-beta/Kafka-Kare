'use client';

import React, { useEffect } from 'react';
import { Box, useToast } from '@chakra-ui/react';
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

  // declare state variables
  const renderClustersPage = clustersStore(state => state.renderClustersPage);
  const clustersStoreReset = clustersStore(state => state.reset);

  // fetch clusters and slack webhook url before rendering page
  useEffect(() => {
    // clustersStoreReset();
    handleFetchClustersAndSlackWebhookURL(toast, push);
    setTimeout(() => {clustersStore.setState({isLoadingModalOpen: false});}, 1500);
  }, []);

  if (renderClustersPage) {
    return (
      <Box width='full' height='100vh'>
        <LoadingModal />

        {/* Navbar */}
        <Navbar />

        {/* Main Container */}
        <MainContainer />
      </Box>
    );
  }
}