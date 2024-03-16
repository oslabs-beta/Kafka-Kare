import React, { useState, useEffect } from 'react';
import {
  Box, Flex, SimpleGrid, Button, Spacer, Image, useToast,
  Input, InputGroup, InputLeftElement, InputRightElement, Icon, IconButton,
  Tabs, TabList, TabIndicator, TabPanels, Tab, TabPanel,
  Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider, Avatar,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Search2Icon, AddIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { RxStar, RxStarFilled } from 'react-icons/rx';
import { MdOutlineLockReset } from 'react-icons/md';
import { RiImageAddFill, RiUserUnfollowFill, RiDownload2Fill } from 'react-icons/ri';
import { FaSignOutAlt } from 'react-icons/fa';
import { clustersStore } from '../store/clusters';
import MenuDrawer from '../components/clusters/menuDrawer';
import AddClusterModal from '../components/clusters/addClusterModal';
import ClusterCard from '../components/clusters/clusterCard';
import EditClusterModal from '../components/clusters/editClusterModal';
import DeleteClusterModal from '../components/clusters/deleteClusterModal';
import LogoutModal from '../components/clusters/logoutModal';
import { handleClusterSearchValueChange, handleFetchClusters } from '../utils/clustersHandler';

export default function Home() {

  // declare variable to use toast and push
  const { push } = useRouter();
  const toast = useToast();

  // declare state variables
  const clusterDisplayMap = clustersStore(state => state.clusterDisplayMap);
  const clusterFavoriteDisplayMap = clustersStore(state => state.clusterFavoriteDisplayMap);
  const clusterNotFavoriteDisplayMap = clustersStore(state => state.clusterNotFavoriteDisplayMap);
  const renderClustersPage = clustersStore(state => state.renderClustersPage);

  useEffect(() => {
    handleFetchClusters(toast, push);
  }, []);
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
              type='tel' placeholder={'Name or Port'}
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
          <AddClusterModal />

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
              <LogoutModal />
            </MenuList>
          </Menu>

          <Spacer />
          
          {/* Open Menu Button */}
          <IconButton aria-label='open drawer' onClick={() => clustersStore.setState({isDrawerOpen: true})} icon={<HamburgerIcon />} />

          {/* Menu Drawer */}
          <MenuDrawer />
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
              <DeleteClusterModal/>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    );
  }
}