import React, { useState, useEffect } from 'react';
import {
  Box, Flex, SimpleGrid, Button, Spacer, Image, useToast,
  Input, InputGroup, InputLeftElement, InputRightElement, Icon, IconButton,
  Tabs, TabList, TabIndicator, TabPanels, Tab, TabPanel,
  Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider, Avatar,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Search2Icon, AddIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { RxStar, RxStarFilled } from 'react-icons/rx';
import { MdOutlineLockReset } from 'react-icons/md';
import { RiImageAddFill, RiUserUnfollowFill, RiDownload2Fill } from 'react-icons/ri';
import { FaSignOutAlt } from 'react-icons/fa';
import path from 'path';
import { clustersStore } from '../store/clusters';
import MenuDrawer from '../components/clusters/menuDrawer';
import AddClusterModal from '../components/clusters/addClusterModal';
import ClusterCard from '../components/clusters/clusterCard';
import EditClusterModal from '../components/clusters/editClusterModal';
import DeleteClusterModal from '../components/clusters/deleteClusterModal';
import LogoutModal from '../components/clusters/logoutModal';
import ColorMode from '../components/colorModeButton';

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
  const slackWebhookURL = clustersStore(state => state.slackWebhookURL);

  const [renderClustersPage, setRenderClustersPage] = useState(false);

  useEffect(() => {

    // fetch user clusters when page loaded
    const fetchClusters = async () => {
      try {
        // update states about user's all clusters
        const responseAll = await axios('http://localhost:3001/clusters/userClusters', {withCredentials: true});
        setRenderClustersPage(true);
        console.log('Get User Clusters Response:', responseAll.data);
        clustersStore.setState({clusterMap: new Map(responseAll.data.map((obj) => [obj._id, obj]))});
        clustersStore.setState({clusterDisplayMap: new Map(responseAll.data.map((obj) => [obj._id, obj]))});

        // update states about user's favorite clusters
        const responseFavorite = await axios('http://localhost:3001/clusters/favorites', {withCredentials: true});
        setRenderClustersPage(true);
        console.log('Get User\'s Favorite Clusters Response:', responseFavorite.data);
        clustersStore.setState({clusterFavoriteMap: new Map(responseFavorite.data.map((obj) => [obj._id, obj]))});
        clustersStore.setState({clusterFavoriteDisplayMap: new Map(responseFavorite.data.map((obj) => [obj._id, obj]))});

        // update states about user's not favorite clusters
        const responseNotFavorite = await axios('http://localhost:3001/clusters/notFavorites', {withCredentials: true});
        setRenderClustersPage(true);
        console.log('Get User\'s Not Favorite Clusters Response:', responseNotFavorite.data);
        clustersStore.setState({clusterNotFavoriteMap: new Map(responseNotFavorite.data.map((obj) => [obj._id, obj]))});
        clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(responseNotFavorite.data.map((obj) => [obj._id, obj]))});
      } catch (err) {
        console.log(err);
        setRenderClustersPage(false);
        push('/home');
        addToast('Authentication Required', 'A token is required for authentication', 'error', 3000);
      }
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

    // check input format
    if (clusterName === '') clustersStore.setState({isClusterNameEmpty: true});
    if (clusterPort === '') clustersStore.setState({isClusterPortEmpty: true});
    if (clusterName !== '' && clusterPort !== '') {

      // actions when addClusterModal close
      handleNewClusterClose();
      try {
        const response = await axios.post('http://localhost:3001/clusters/addCluster', {name: clusterName, hostnameAndPort: clusterPort}, {withCredentials: true});
        console.log('New Cluster Response:', response.data);

        addToast('Cluster Created', 'We\'ve created your cluster for you.', 'success', 3000);

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

      addToast('Cluster Edited', 'We\'ve edited your cluster for you.', 'success', 3000);

      // update states about user clusters      {123: {name: 'cluster2', porty: 'localhost:9091', favorite}}
      clustersStore.setState({clusterMap: new Map(clusterMap.set(editClusterID, {...clusterMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      clustersStore.setState({clusterDisplayMap: new Map(clusterDisplayMap.set(editClusterID, {...clusterDisplayMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterFavoriteMap.has(editClusterID)) clustersStore.setState({clusterFavoriteMap: new Map(clusterFavoriteMap.set(editClusterID, {...clusterFavoriteMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterFavoriteDisplayMap.has(editClusterID)) clustersStore.setState({clusterFavoriteDisplayMap: new Map(clusterFavoriteDisplayMap.set(editClusterID, {...clusterFavoriteDisplayMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterNotFavoriteMap.has(editClusterID)) clustersStore.setState({clusterNotFavoriteMap: new Map(clusterNotFavoriteMap.set(editClusterID, {...clusterNotFavoriteMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterNotFavoriteDisplayMap.has(editClusterID)) clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(clusterNotFavoriteDisplayMap.set(editClusterID, {...clusterNotFavoriteDisplayMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      try {
        const response = await axios.patch(`http://localhost:3001/clusters/${editClusterID}`, {name: clusterName, hostnameAndPort: clusterPort}, {withCredentials: true});
        console.log('Edit Cluster Response:', response.data);
      } catch (err) {console.log(err)}
    }
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
      const response = await axios.delete(`http://localhost:3001/clusters/${deleteClusterID}`, {withCredentials: true});
      console.log('Delete Cluster Response:', response.data);

      addToast('Cluster Deleted', 'We\'ve deleted your cluster for you.', 'success', 3000);
    } catch (err) {console.log(err)}
  }

  /*
   * Toggle Cluster Favorite
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
      const response = await axios.patch(`http://localhost:3001/clusters/favorites/${favoriteClusterID}`, {}, {withCredentials: true});
      console.log('Set Favorite Cluster Response:', response.data);
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
    clustersStore.setState({clusterDisplayMap: new Map(
      [...clusterMap].filter(([id, clusterObj]) =>
        clusterObj.name.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
        || clusterObj.hostnameAndPort.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
    ))});

    // update states about user search value and favorite display cluster
    clustersStore.setState({clusterFavoriteDisplayMap: new Map(
      [...clusterFavoriteMap].filter(([id, clusterObj]) =>
        clusterObj.name.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
        || clusterObj.hostnameAndPort.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
    ))});

    // update states about user search value and not favorite display cluster
    clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(
      [...clusterNotFavoriteMap].filter(([id, clusterObj]) =>
        clusterObj.name.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
        || clusterObj.hostnameAndPort.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
    ))});
  }

  /*
   * Update Slack Webhook URL Event
   */
  const handleSlackWebhookURLSubmit = async () => {
    try {
      alert('Slack Webhook URL:', slackWebhookURL);
      // const response = await axios.patch(`http://localhost:3001/...`, {slackWebhookURL: slackWebhookURL}, {withCredentials: true});
      // console.log('Change Slack Webhook URL Response:', response.data);
      clustersStore.setState({isDrawerOpen: false});
      addToast('Slack Webhook URL Updated', 'We\'ve updated your Slack Webhook URL for you.', 'success', 3000);
    } catch (err) {console.log(err)}
  }

  /*
   * User Logout
   */
  const handleLogout = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/logout`, {withCredentials: true});
      console.log('Logout Response:', response.data);
      clustersStore.setState({isLogoutModalOpen: false});
      push('/home');
      addToast('Logout', 'User logged out successfully.', 'success', 3000);
    } catch (err) {console.log(err)}
  }

  // definition of using toast
  const toast = useToast();
  const addToast = (title, description, status, duration) => {
    toast({position: 'top', title, description, status, duration, isClosable: true, containerStyle: {marginTop: '70px'}});
  }
  // const drawerBtnRef = React.useRef();

  if (renderClustersPage) {
    return (
      <Box width='full' height='100vh'>

        {/* Navbar */}
        <Flex p={5} px={20} width='full' borderWidth={1} boxShadow='lg'>

          {/* Logo */}
          <Image src='/kafka-kare-logo-v3.png' h={10} borderRadius={8} />

          <Spacer />

          {/* Search input */}
          <InputGroup w={['22%', '22%', '32%', '50%', '62%', '68%']}>
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

          {/* Personal Menu */}
          <Menu>
            <MenuButton as={Avatar} src='' boxSize={10} bg='gray.400' _hover={{cursor: 'pointer', bg: 'gray.500'}}/>
            <MenuList>
              <MenuItem icon={<Icon as={MdOutlineLockReset} boxSize={6} />}><b>Change Password</b></MenuItem>
              <MenuItem icon={<Icon as={RiDownload2Fill} boxSize={6} />}><b>Download Information</b></MenuItem>
              <MenuItem icon={<Icon as={RiImageAddFill} boxSize={6} />}><b>Upload Image</b></MenuItem>
              <MenuItem icon={<Icon as={RiUserUnfollowFill} boxSize={6} />}><b>Delete Account</b></MenuItem>
              <MenuItem icon={<Icon as={FaSignOutAlt} boxSize={6} pl={0.5} />} onClick={() => clustersStore.setState({isLogoutModalOpen: true})}><b>Logout</b></MenuItem>
              <LogoutModal handleLogout={handleLogout} />
            </MenuList>
          </Menu>

          <Spacer />
          
          {/* Open Menu Button */}
          <IconButton aria-label='open drawer' onClick={() => clustersStore.setState({isDrawerOpen: true})} icon={<HamburgerIcon />} />

          {/* Menu Drawer */}
          <MenuDrawer handleSlackWebhookURLSubmit={handleSlackWebhookURLSubmit} />
        </Flex>

        {/* Cluster Display */}
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
                    <ClusterCard key={'clusterCard'+id} clusterObj={clusterObj} handleFavoriteChange={handleFavoriteChange}/>
                  ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                  {[...clusterFavoriteDisplayMap].toSorted((a, b) => Date.parse(a[1].dateAdded) - Date.parse(b[1].dateAdded))
                    .map(([id, clusterObj]) => (

                    /* Cluster Card */
                    <ClusterCard key={'clusterCard'+id} clusterObj={clusterObj} handleFavoriteChange={handleFavoriteChange}/>
                  ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                  {[...clusterNotFavoriteDisplayMap].toSorted((a, b) => Date.parse(a[1].dateAdded) - Date.parse(b[1].dateAdded))
                    .map(([id, clusterObj]) => (

                    /* Cluster Card */
                    <ClusterCard key={'clusterCard'+id} clusterObj={clusterObj} handleFavoriteChange={handleFavoriteChange}/>
                  ))}
                </SimpleGrid>
              </TabPanel>
              
              {/* Edit Cluster Modal */}
              <EditClusterModal
                handleEditClusterClose={handleEditClusterClose} handleEditCluster={handleEditCluster}
                handleClusterNameChange={handleClusterNameChange} handleClusterPortChange={handleClusterPortChange}
              />

              {/* Delete Cluster Modal */}
              <DeleteClusterModal handleDeleteCluster={handleDeleteCluster} />
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    );
  }
}