import React from 'react';
import { Flex, Button, Spacer, Image, IconButton } from '@chakra-ui/react';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import { clustersStore } from '../../store/clusters';
import SearchInput from './navbar/searchInput';
import AccountMenu from './navbar/accountMenu';
import MenuDrawer from './navbar/menuDrawer';
import AddClusterModal from './navbar/addClusterModal';

const Navbar = () => {

  return (
    <Flex p={5} px={20} width='full' borderWidth={1} boxShadow='lg'>

      {/* Logo */}
      <Image src='/kafka-kare-logo-v3.png' h={10} borderRadius={8} />

      <Spacer />

      {/* Search input */}
      <SearchInput />

      <Spacer />

      {/* Add Cluster Button */}
      <Button onClick={() => clustersStore.setState({isNewClusterOpen: true})} leftIcon={<AddIcon />} colorScheme='teal' variant='solid'>
        New Cluster
      </Button>

      {/* Add Cluster Modal */}
      <AddClusterModal />

      <Spacer />

      {/* Account Menu */}
      <AccountMenu />

      <Spacer />
      
      {/* Open Menu Button */}
      <IconButton aria-label='open drawer' onClick={() => clustersStore.setState({isDrawerOpen: true})} icon={<HamburgerIcon />} />

      {/* Menu Drawer */}
      <MenuDrawer />
    </Flex>
  )
}

export default Navbar;