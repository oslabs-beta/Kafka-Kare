import React from 'react';
import { Flex, Button, Spacer, Image, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { AddIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { clustersStore } from '../../store/clusters';
import SearchInput from './navbar/searchInput';
import AccountMenu from './navbar/accountMenu';
import MenuDrawer from './navbar/menuDrawer';
import AddClusterModal from './navbar/addClusterModal';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("red.500", "red.200")
  const color = useColorModeValue("white", "gray.800")
  const colorModeIcon = useColorModeValue(<SunIcon />, <MoonIcon />);
  console.log(colorMode);
  
  // <Box mb={4} bg={bg} color={color}>
  //   This box's style will change based on the color mode.
  // </Box>

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

      {/* Toggle Color Mode Button */}
      <IconButton
        aria-label='toggle color mode' icon={colorModeIcon}
        onClick={toggleColorMode} isRound variant='outline' borderWidth={3}
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