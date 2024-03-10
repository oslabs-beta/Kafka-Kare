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
  const clusterArray = clustersStore(state => state.clusterArray);
  const clusterDisplayArray = clustersStore(state => state.clusterDisplayArray);
  const clusterName = clustersStore(state => state.clusterName);
  const clusterPort = clustersStore(state => state.clusterPort);
  const clusterSearchValue = clustersStore(state => state.clusterSearchValue);

  useEffect(() => {

    // fetch user clusters when page loaded
    const fetchClusters = async () => {
      try {
        const response = await axios('/clusters/userClusters', {credentials: 'include'});
        console.log('Get User Clusters Response:', response.data);

        // update states about user's clusters
        clustersStore.setState({clusterArray: response.data});
        clustersStore.setState({clusterDisplayArray: response.data});
      } catch (err) {console.log(err)}
    };
    fetchClusters();
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
        const response = await axios.post('/clusters/addCluster', {name: clusterName, hostnameAndPort: clusterPort});
        console.log('New Cluster Response:', response.data);

        // update states about user clusters
        clustersStore.setState({clusterArray: clusterArray.concat(response.data)});
        clustersStore.setState({clusterDisplayArray: clusterArray.concat(response.data)});
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
      for (const [index, clusterObj] of clusterDisplayArray.entries()) {
        if (clusterObj._id === editClusterID) {
          clustersStore.setState({clusterDisplayArray: clusterDisplayArray.toSpliced(index, 1, {...clusterDisplayArray[index], name: clusterName, hostnameAndPort: clusterPort})});
          break;
        }
      }
      for (const [index, clusterObj] of clusterArray.entries()) {
        if (clusterObj._id === editClusterID) {
          clustersStore.setState({clusterArray: clusterArray.toSpliced(index, 1, {...clusterArray[index], name: clusterName, hostnameAndPort: clusterPort})});
          break;
        }
      }
      try {
        const response = await axios.patch(`/clusters/${editClusterID}`, {name: clusterName, hostnameAndPort: clusterPort});
        console.log("Edit Cluster Response:", response.data);
      } catch (err) {console.log(err)}
    }
  }

  /*
   * Toogle Cluster Favorite
   */
  const handleFavoriteChange = async (favoriteClusterID) => {

    // update states about user clusters
    for (const [index, clusterObj] of clusterDisplayArray.entries()) {
      if (clusterObj._id === favoriteClusterID) {
        clustersStore.setState({clusterDisplayArray: clusterDisplayArray.toSpliced(index, 1, {...clusterDisplayArray[index], favorite: !clusterDisplayArray[index].favorite})});
        break;
      }
    }
    for (const [index, clusterObj] of clusterArray.entries()) {
      if (clusterObj._id === favoriteClusterID) {
        clustersStore.setState({clusterArray: clusterArray.toSpliced(index, 1, {...clusterArray[index], favorite: !clusterArray[index].favorite})});
        break;
      }
    }
    try {
      const response = await axios.patch(`/clusters/favorites/${favoriteClusterID}`, {});
      console.log("Set Favorite Cluster Response:", response.data);
    } catch (err) {console.log(err)}
  }

  /*
   * Delete Cluster Event
   */
  const handleDeleteCluster = async (deleteClusterID) => {

    // update states about user clusters
    for (const [index, clusterObj] of clusterDisplayArray.entries()) {
      if (clusterObj._id === deleteClusterID) {
        clustersStore.setState({clusterDisplayArray: clusterDisplayArray.toSpliced(index, 1)});
        break;
      }
    }
    for (const [index, clusterObj] of clusterArray.entries()) {
      if (clusterObj._id === deleteClusterID) {
        clustersStore.setState({clusterArray: clusterArray.toSpliced(index, 1)});
        break;
      }
    }
    clustersStore.setState({isDeleteClusterOpen: false});
    try {
      const response = await axios.delete(`/clusters/${deleteClusterID}`);
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
    const newClusterDisplayArray = [];

    // update states about user search value and display cluster
    clustersStore.setState({clusterSearchValue: curClusterSearchValue});
    clusterArray.map((clusterObj) => {
      if (clusterObj.name.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
      || clusterObj.hostnameAndPort.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1) {
        newClusterDisplayArray.push(clusterObj);
      }
    });
    clustersStore.setState({clusterDisplayArray: newClusterDisplayArray});
  }
  // const drawerBtnRef = React.useRef();

  return (
    <Box width="full" height="100vh">

      {/* Navbar */}
      <Flex p={6} px={100} width="full" borderWidth={1} boxShadow="lg">

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
      <Box width="full" justifyContent="center" p={8} style={{height: 'calc(100% - 90px)'}} overflowY="scroll">
        <Tabs variant='line'>
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
          {clusterDisplayArray.map((clusterObj, index) => (

            /* Cluster Card */
            <ClusterCard key={'clusterCard'+index} index={index} clusterObj={clusterObj} handleFavoriteChange={handleFavoriteChange}/>
          ))}

          {/* Edit Cluster Modal */}
          <EditClusterModal
            handleEditClusterClose={handleEditClusterClose} handleEditCluster={handleEditCluster}
            handleClusterNameChange={handleClusterNameChange} handleClusterPortChange={handleClusterPortChange}
          />

          {/* Delete Cluster Modal */}
          <DeleteClusterModal handleDeleteCluster={handleDeleteCluster} />
        </SimpleGrid>
      </Box>
    </Box>
  );
}