import React, { useEffect } from 'react';
import {
  Box, Flex, SimpleGrid, Button, Spacer, Image,
  Input, InputGroup, InputLeftElement, InputRightElement, IconButton,
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Search2Icon, AddIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import path from 'path';
import { clustersStore } from '../store/clusters';
import MenuDrawer from '../components/clusters/menuDrawer';
import AddClusterModal from '../components/clusters/addClusterModal';
import ClusterCard from '../components/clusters/clusterCard';
import EditClusterModal from '../components/clusters/editClusterModal';
import DeleteClusterModal from '../components/clusters/deleteClusterModal';

export default function Home() {
  const { push } = useRouter();

  // declare state variables
  const clusterMap = clustersStore(state => state.clusterMap);
  const clusterDisplayMap = clustersStore(state => state.clusterDisplayMap);
  const clusterFavoriteMap = clustersStore(state => state.clusterFavoriteMap);
  const clusterFavoriteDisplayMap = clustersStore(state => state.clusterFavoriteDisplayMap);
  const clusterNotFavoriteMap = clustersStore(state => state.clusterNotFavoriteMap);
  const clusterNotFavoriteDisplayMap = clustersStore(state => state.clusterNotFavoriteDisplayMap);
  const clusterName = clustersStore(state => state.clusterName);
  const clusterPort = clustersStore(state => state.clusterPort);
  const clusterSearchValue = clustersStore(state => state.clusterSearchValue);

  useEffect(() => {

    // fetch user clusters when page loaded
    const fetchClusters = async () => {
      try {
        const response = await axios('http://localhost:3001/clusters/userClusters', {credentials: 'include'});
        console.log('Get User Clusters Response:', response.data);

        // update states about user's clusters
        clustersStore.setState({clusterMap: new Map(response.data.map((obj) => [obj._id, obj]))});
        clustersStore.setState({clusterDisplayMap: new Map(response.data.map((obj) => [obj._id, obj]))});
      } catch (err) {console.log(err)}
    };
    const fetchFavoriteClusters = async () => {
      try {
        const response = await axios('http://localhost:3001/clusters/favorites', {credentials: 'include'});
        console.log('Get User\'s Favorite Clusters Response:', response.data);

        // update states about user's clusters
        clustersStore.setState({clusterFavoriteMap: new Map(response.data.map((obj) => [obj._id, obj]))});
        clustersStore.setState({clusterFavoriteDisplayMap: new Map(response.data.map((obj) => [obj._id, obj]))});
      } catch (err) {console.log(err)}
    };
    const fetchNotFavoriteClusters = async () => {
      try {
        const response = await axios('http://localhost:3001/clusters/notFavorites', {credentials: 'include'});
        console.log('Get User\'s Not Favorite Clusters Response:', response.data);

        // update states about user's clusters
        clustersStore.setState({clusterNotFavoriteMap: new Map(response.data.map((obj) => [obj._id, obj]))});
        clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(response.data.map((obj) => [obj._id, obj]))});
      } catch (err) {console.log(err)}
    };

    fetchClusters();
    fetchFavoriteClusters();
    fetchNotFavoriteClusters();
  }, []);

  // actions when addClusterModal close
  const handleNewClusterClose = () => {
    clustersStore.setState({clusterName: ''});
    clustersStore.setState({clusterPort: ''});
    clustersStore.setState({isClusterNameEmpty: false});
    clustersStore.setState({isClusterPortEmpty: false});
    clustersStore.setState({isNewClusterOpen: false});
  }
  
  /*
   * Add Cluster Event
   */
  const handleNewCluster = async () => {

    // check input format
    if (clusterName === '') clustersStore.setState({isClusterNameEmpty: true});
    if (clusterPort === '') clustersStore.setState({isClusterPortEmpty: true});
    if (clusterName !== '' && clusterPort !== '') {

      // actions when addClusterModal close
      handleNewClusterClose();
      try {
        const response = await axios.post('http://localhost:3001//clusters/addCluster', {name: clusterName, hostnameAndPort: clusterPort});
        console.log('New Cluster Response:', response.data);

        // update states about user clusters
        clustersStore.setState({clusterMap: new Map(clusterMap.set(response.data._id, response.data))});
        clustersStore.setState({clusterDisplayMap: new Map(clusterDisplayMap.set(response.data._id, response.data))});
        clustersStore.setState({clusterNotFavoriteMap: new Map(clusterNotFavoriteMap.set(response.data._id, response.data))});
        clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(clusterNotFavoriteDisplayMap.set(response.data._id, response.data))});
      } catch (err) {console.log(err)}
    }
  };

  // actions when editClusterModal close
  const handleEditClusterClose = () => {
    clustersStore.setState({clusterName: ''});
    clustersStore.setState({clusterPort: ''});
    clustersStore.setState({isClusterNameEmpty: false});
    clustersStore.setState({isClusterPortEmpty: false});
    clustersStore.setState({isEditClusterOpen: false});
  }

  /*
   * Edit Cluster Event
   */
  const handleEditCluster = async (editClusterID) => {

    // check input format
    if (clusterName === '') clustersStore.setState({isClusterNameEmpty: true});
    if (clusterPort === '') clustersStore.setState({isClusterPortEmpty: true});
    if (clusterName !== '' && clusterPort !== '') {

      // actions when editClusterModal close
      handleEditClusterClose();

      // update states about user clusters
      clustersStore.setState({clusterMap: new Map(clusterMap.set(editClusterID, {...clusterMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      clustersStore.setState({clusterDisplayMap: new Map(clusterDisplayMap.set(editClusterID, {...clusterDisplayMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterFavoriteMap.has(editClusterID)) clustersStore.setState({clusterFavoriteMap: new Map(clusterFavoriteMap.set(editClusterID, {...clusterFavoriteMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterFavoriteDisplayMap.has(editClusterID)) clustersStore.setState({clusterFavoriteDisplayMap: new Map(clusterFavoriteDisplayMap.set(editClusterID, {...clusterFavoriteDisplayMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterNotFavoriteMap.has(editClusterID)) clustersStore.setState({clusterNotFavoriteMap: new Map(clusterNotFavoriteMap.set(editClusterID, {...clusterNotFavoriteMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterNotFavoriteDisplayMap.has(editClusterID)) clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(clusterNotFavoriteDisplayMap.set(editClusterID, {...clusterNotFavoriteDisplayMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      try {
        const response = await axios.patch(`http://localhost:3001/clusters/${editClusterID}`, {name: clusterName, hostnameAndPort: clusterPort});
        console.log("Edit Cluster Response:", response.data);
      } catch (err) {console.log(err)}
    }
  }

  /*
   * Toogle Cluster Favorite
   */
  const handleFavoriteChange = async (favoriteClusterID) => {

    // update states about user clusters
    clustersStore.setState({clusterDisplayMap: new Map(clusterDisplayMap.set(favoriteClusterID, {...clusterDisplayMap.get(favoriteClusterID), favorite: !clusterDisplayMap.get(favoriteClusterID).favorite}))});
    clustersStore.setState({clusterMap: new Map(clusterMap.set(favoriteClusterID, {...clusterMap.get(favoriteClusterID), favorite: !clusterMap.get(favoriteClusterID).favorite}))});
    if (clusterFavoriteMap.has(favoriteClusterID)) {
      const changedClusterObj = clusterFavoriteMap.get(favoriteClusterID);
      clusterFavoriteMap.delete(favoriteClusterID);
      clustersStore.setState({clusterFavoriteMap: new Map(clusterFavoriteMap)});
      clusterFavoriteDisplayMap.delete(favoriteClusterID);
      clustersStore.setState({clusterFavoriteDisplayMap: new Map(clusterFavoriteDisplayMap)});
      clustersStore.setState({clusterNotFavoriteMap: new Map(clusterNotFavoriteMap.set(favoriteClusterID, {...changedClusterObj, favorite: !changedClusterObj.favorite}))});
      clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(clusterNotFavoriteDisplayMap.set(favoriteClusterID, {...changedClusterObj, favorite: !changedClusterObj.favorite}))});
    } else {
      const changedClusterObj = clusterNotFavoriteMap.get(favoriteClusterID);
      clusterNotFavoriteMap.delete(favoriteClusterID);
      clustersStore.setState({clusterNotFavoriteMap: new Map(clusterNotFavoriteMap)});
      clusterNotFavoriteDisplayMap.delete(favoriteClusterID);
      clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(clusterNotFavoriteDisplayMap)});
      clustersStore.setState({clusterFavoriteMap: new Map(clusterFavoriteMap.set(favoriteClusterID, {...changedClusterObj, favorite: !changedClusterObj.favorite}))});
      clustersStore.setState({clusterFavoriteDisplayMap: new Map(clusterFavoriteDisplayMap.set(favoriteClusterID, {...changedClusterObj, favorite: !changedClusterObj.favorite}))});
    }
    try {
      const response = await axios.patch(`http://localhost:3001/clusters/favorites/${favoriteClusterID}`, {});
      console.log("Set Favorite Cluster Response:", response.data);
    } catch (err) {console.log(err)}
  }

  /*
   * Delete Cluster Event
   */
  const handleDeleteCluster = async (deleteClusterID) => {

    // update states about user clusters
    clusterDisplayMap.delete(deleteClusterID);
    clustersStore.setState({clusterDisplayMap: new Map(clusterDisplayMap)});
    clusterMap.delete(deleteClusterID);
    clustersStore.setState({clusterMap: new Map(clusterMap)});
    if (clusterFavoriteMap.has(deleteClusterID)) {
      clusterFavoriteMap.delete(deleteClusterID);
      clustersStore.setState({clusterFavoriteMap: new Map(clusterFavoriteMap)});
      clusterFavoriteDisplayMap.delete(deleteClusterID);
      clustersStore.setState({clusterFavoriteDisplayMap: new Map(clusterFavoriteDisplayMap)});
    } else {
      clusterNotFavoriteMap.delete(deleteClusterID);
      clustersStore.setState({clusterNotFavoriteMap: new Map(clusterNotFavoriteMap)});
      clusterNotFavoriteDisplayMap.delete(deleteClusterID);
      clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(clusterNotFavoriteDisplayMap)});
    }
    clustersStore.setState({isDeleteClusterOpen: false});
    try {
      const response = await axios.delete(`http://localhost:3001/clusters/${deleteClusterID}`);
      console.log("Delete Cluster Response:", response.data);
    } catch (err) {console.log(err)}
  }

  // actios when name input changes
  const handleClusterNameChange = (event) => {
    clustersStore.setState({isClusterNameEmpty: false});
    clustersStore.setState({clusterName: event.target.value});
  };
  
  // actios when port input changes
  const handleClusterPortChange = (event) => {
    clustersStore.setState({isClusterPortEmpty: false});
    clustersStore.setState({clusterPort: event.target.value});
  };
  
  // actios when search input changes
  const handleClusterSearchValueChange = (curClusterSearchValue) => {
    clustersStore.setState({clusterSearchValue: curClusterSearchValue});

    // update states about user search value and display cluster
    const newClusterDisplayMap = new Map();
    for (const [key, clusterObj] of clusterMap) {
      if (clusterObj.name.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
      || clusterObj.hostnameAndPort.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1) {
        newClusterDisplayMap.set(clusterObj._id, clusterObj);
      }
    };
    clustersStore.setState({clusterDisplayMap: newClusterDisplayMap});

    // update states about user search value and favorite display cluster
    const newClusterFavoriteDisplayMap = new Map();
    for (const [key, clusterObj] of clusterFavoriteMap) {
      if (clusterObj.name.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
      || clusterObj.hostnameAndPort.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1) {
        newClusterFavoriteDisplayMap.set(clusterObj._id, clusterObj);
      }
    };
    clustersStore.setState({clusterFavoriteDisplayMap: newClusterFavoriteDisplayMap});

    // update states about user search value and not favorite display cluster
    const newClusterNotFavoriteDisplayMap = new Map();
    for (const [key, clusterObj] of clusterNotFavoriteMap) {
      if (clusterObj.name.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
      || clusterObj.hostnameAndPort.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1) {
        newClusterNotFavoriteDisplayMap.set(clusterObj._id, clusterObj);
      }
    };
    clustersStore.setState({clusterNotFavoriteDisplayMap: newClusterNotFavoriteDisplayMap});
  }
  // const drawerBtnRef = React.useRef();

  return (
    <Box width="full" height="100vh">

      {/* Navbar */}
      <Flex p={10} px={100} width="full" borderWidth={1} boxShadow="lg">

        {/* Logo */}
        <Image src='/kafka-kare-logo.png' h={10} borderRadius={8} />

        <Spacer />

        {/* Search input */}
        <InputGroup w={["22%", "22%", "36%", "52%", "62%", "68%"]}>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon />
          </InputLeftElement>
          <Input
            type='tel' placeholder={'Name or Port'} value={clusterSearchValue}
            onChange={(event) => handleClusterSearchValueChange(event.target.value)}
          />
          <InputRightElement>
          <IconButton
            _hover={''} isRound={true} aria-label='clean cluster search' size='xs' icon={<CloseIcon color='gray.500' />}
            variant='ghost' onClick = {() => handleClusterSearchValueChange('')}
          />
          </InputRightElement>
        </InputGroup>

        <Spacer />

        {/* Add Cluster Button */}
        <Button onClick={() => clustersStore.setState({isNewClusterOpen: true})} leftIcon={<AddIcon />} colorScheme='teal' variant='solid'>
          New Cluster
        </Button>

        {/* Add Cluster Modal */}
        <AddClusterModal
          handleNewClusterClose={handleNewClusterClose} handleNewCluster={handleNewCluster}
          handleClusterNameChange={handleClusterNameChange} handleClusterPortChange={handleClusterPortChange}
        />

        <Spacer />
        
        {/* Open Menu Button */}
        <IconButton aria-label='open drawer' onClick={() => clustersStore.setState({isDrawerOpen: true})} icon={<HamburgerIcon />} />

        {/* Menu Drawer */}
        <MenuDrawer />
      </Flex>

      {/* Cluster Display */}
      <Box width="full" justifyContent="center" p={8} style={{height: 'calc(100% - 90px)'}}>
        <Tabs variant='line' onChange={(index) => {}} style={{height: 'calc(100% - 32px)'}}>
          <TabList w='100%'>
            <Tab>All</Tab>
            <Tab>Favorite</Tab>
            <Tab>Not Favorite</Tab>
          </TabList>
          <TabPanels overflowY="auto" h='100%'>
            <TabPanel>
              <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(350px, 1fr))'>
                {[...clusterDisplayMap].map(([id, clusterObj]) => (

                  /* Cluster Card */
                  <ClusterCard key={'clusterCard'+id} clusterObj={clusterObj} handleFavoriteChange={handleFavoriteChange}/>
                ))}

                {/* Edit Cluster Modal */}
                <EditClusterModal
                  handleEditClusterClose={handleEditClusterClose} handleEditCluster={handleEditCluster}
                  handleClusterNameChange={handleClusterNameChange} handleClusterPortChange={handleClusterPortChange}
                />

                {/* Delete Cluster Modal */}
                <DeleteClusterModal handleDeleteCluster={handleDeleteCluster} />
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(350px, 1fr))'>
                {[...clusterFavoriteDisplayMap].map(([id, clusterObj]) => (

                  /* Cluster Card */
                  <ClusterCard key={'clusterCard'+id} clusterObj={clusterObj} handleFavoriteChange={handleFavoriteChange}/>
                ))}

                {/* Edit Cluster Modal */}
                <EditClusterModal
                  handleEditClusterClose={handleEditClusterClose} handleEditCluster={handleEditCluster}
                  handleClusterNameChange={handleClusterNameChange} handleClusterPortChange={handleClusterPortChange}
                />

                {/* Delete Cluster Modal */}
                <DeleteClusterModal handleDeleteCluster={handleDeleteCluster} />
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(350px, 1fr))'>
                {[...clusterNotFavoriteDisplayMap].map(([id, clusterObj]) => (

                  /* Cluster Card */
                  <ClusterCard key={'clusterCard'+id} clusterObj={clusterObj} handleFavoriteChange={handleFavoriteChange}/>
                ))}

                {/* Edit Cluster Modal */}
                <EditClusterModal
                  handleEditClusterClose={handleEditClusterClose} handleEditCluster={handleEditCluster}
                  handleClusterNameChange={handleClusterNameChange} handleClusterPortChange={handleClusterPortChange}
                />

                {/* Delete Cluster Modal */}
                <DeleteClusterModal handleDeleteCluster={handleDeleteCluster} />
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}