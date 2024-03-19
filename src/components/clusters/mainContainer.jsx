import React from 'react';
import { Box, SimpleGrid, Icon, Tabs, TabList, TabIndicator, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { RxStar, RxStarFilled } from 'react-icons/rx';
import { clustersStore } from '../../store/clusters';
import ClusterCard from './mainContainer/clusterCard';
import EditClusterModal from './mainContainer/editClusterModal';
import DeleteClusterModal from './mainContainer/deleteClusterModal';

const MainContainer = () => {

  // declare state variables
  const clusterDisplayMap = clustersStore(state => state.clusterDisplayMap);
  const clusterFavoriteDisplayMap = clustersStore(state => state.clusterFavoriteDisplayMap);
  const clusterNotFavoriteDisplayMap = clustersStore(state => state.clusterNotFavoriteDisplayMap);

  return (
    <Box width='full' justifyContent='center' p={2} px={8} style={{height: 'calc(100% - 90px)'}}>
      <Tabs variant='unstyled' onChange={(index) => {}} style={{height: 'calc(100% - 32px)'}}>
        <TabList w='100%'>
          <Tab><b>All</b></Tab>
          <Tab><b>Favorite</b><Icon as={RxStarFilled} color='yellow.300' boxSize={6} /></Tab>
          <Tab><b>Not Favorite</b><Icon as={RxStar} color='black' boxSize={5} /></Tab>
        </TabList>
        <TabIndicator  mt='-2px' height='2px' bg='blue.500' />
        <TabPanels overflowY='auto' h='100%'>
          <TabPanel>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
              {[...clusterDisplayMap].toSorted((a, b) => Date.parse(a[1].dateAdded) - Date.parse(b[1].dateAdded))
                .map(([id, clusterObj]) => (

                /* Cluster Card */
                <ClusterCard key={'clusterCard'+id} clusterObj={clusterObj} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
              {[...clusterFavoriteDisplayMap].toSorted((a, b) => Date.parse(a[1].dateAdded) - Date.parse(b[1].dateAdded))
                .map(([id, clusterObj]) => (

                /* Cluster Card */
                <ClusterCard key={'clusterCard'+id} clusterObj={clusterObj} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
              {[...clusterNotFavoriteDisplayMap].toSorted((a, b) => Date.parse(a[1].dateAdded) - Date.parse(b[1].dateAdded))
                .map(([id, clusterObj]) => (

                /* Cluster Card */
                <ClusterCard key={'clusterCard'+id} clusterObj={clusterObj} />
              ))}
            </SimpleGrid>
          </TabPanel>
          
          {/* Edit Cluster Modal */}
          <EditClusterModal />

          {/* Delete Cluster Modal */}
          <DeleteClusterModal />
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MainContainer;