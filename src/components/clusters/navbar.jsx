import React, { useEffect } from 'react';
import { Flex, Button, Spacer, Image, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { AddIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { clustersStore } from '../../store/clusters';
import SearchInput from './navbar/searchInput';
import AccountMenu from './navbar/accountMenu';
import MenuDrawer from './navbar/menuDrawer';
import AddClusterModal from './navbar/addClusterModal';
import axios from 'axios';

const Navbar = ({ colorMode, toggleColorMode }) => {

  const bg = useColorModeValue("red.500", "red.200")
  const color = useColorModeValue("white", "gray.800")
  const colorModeIcon = useColorModeValue(<SunIcon />, <MoonIcon />);
  const addClusterButtonVariant = useColorModeValue('solid', 'ghost');
  console.log(colorMode);
  useEffect(() => {
    const getUserColorMode = async () => {
      // update states about user's recent color mode
      const responseColorMode = await axios('http://localhost:3001/settings/colorMode', {withCredentials: true});
      console.log('Get User\'s Recent Color Mode Response:', responseColorMode.data);
      console.log('user colormode:', responseColorMode.data.colorMode);
      console.log('current colormode:', colorMode);
      if (responseColorMode.data.colorMode !== colorMode) {
        console.log('user colormode:', responseColorMode.data.colorMode);
        toggleColorMode();
      }
    }
    getUserColorMode();
  }, []);

  return (
    <Flex p={5} px={20} width='full' borderWidth={1} boxShadow='lg'>

      {/* Logo */}
      <Image src='/kafka-kare-logo-v3-dark.png' h={10} borderRadius={8} />

      <Spacer />
      <Spacer />
      
      {/* Search input */}
      <SearchInput />

      <Spacer />
      <Spacer />
      
      {/* Add Cluster Button */}
      <Button onClick={() => clustersStore.setState({isNewClusterOpen: true})} leftIcon={<AddIcon />} colorScheme='teal' variant={addClusterButtonVariant}>
        New Cluster
      </Button>

      {/* Add Cluster Modal */}
      <AddClusterModal />

      <Spacer />
      <Spacer />

      {/* Account Menu */}
      <AccountMenu />

      <Spacer />

      {/* Toggle Color Mode Button */}
      <IconButton
        aria-label='toggle color mode' icon={colorModeIcon} isRound variant='outline' borderWidth={3}
        onClick={async () => {
          toggleColorMode();
          const responseColorMode = await axios('http://localhost:3001/settings/colorMode/toggle', {withCredentials: true});
          console.log('Get User\'s Recent Color Mode Response:', responseColorMode.data);
        }}
      />
      
      <Spacer />
      
      {/* Open Menu Button */}
      <IconButton aria-label='open drawer' icon={<HamburgerIcon boxSize={5} />} variant='ghost'
      onClick={() => clustersStore.setState({isDrawerOpen: true})} />

      {/* Menu Drawer */}
      <MenuDrawer />
    </Flex>
  )
}

export default Navbar;