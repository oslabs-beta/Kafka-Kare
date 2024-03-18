import React from 'react';
import {
  Flex, Button, Spacer, Image, Input, InputGroup, InputLeftElement, InputRightElement, Icon, IconButton,
  Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider, Avatar,
} from '@chakra-ui/react';
import { Search2Icon, AddIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { MdOutlineLockReset } from 'react-icons/md';
import { RiImageAddFill, RiUserUnfollowFill, RiDownload2Fill } from 'react-icons/ri';
import { FaSignOutAlt } from 'react-icons/fa';
import { clustersStore } from '../../store/clusters';
import MenuDrawer from './menuDrawer';
import AddClusterModal from './addClusterModal';
import ChangePasswordModal from './changePasswordModal';
import DeleteAccountModal from './deleteAccountModal';
import LogoutModal from './logoutModal';
import { handleClusterSearchValueChange } from '../../utils/clustersHandler';

const Navbar = () => {
  const clusterSearchValue = clustersStore(state => state.clusterSearchValue);

  return (
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
      <AddClusterModal />

      <Spacer />

      {/* Personal Menu */}
      <Menu>
        <MenuButton as={Avatar} src='' display='-webkit-box' name='' boxSize={10} bg='gray.400' color='white' _hover={{cursor: 'pointer', bg: 'gray.500'}}/>
        <MenuList>
          <MenuItem icon={<Icon as={MdOutlineLockReset} boxSize={6} />} onClick={() => clustersStore.setState({isChangePasswordModalOpen: true})}>
            <b>Change Password</b>
            <ChangePasswordModal />
          </MenuItem>
          <MenuItem icon={<Icon as={RiDownload2Fill} boxSize={6} />}><b>Download Information</b></MenuItem>
          <MenuItem icon={<Icon as={RiImageAddFill} boxSize={6} />}><b>Upload Image</b></MenuItem>
          <MenuItem icon={<Icon as={RiUserUnfollowFill} boxSize={6} />} onClick={() => clustersStore.setState({isDeleteAccountModalOpen: true})}>
            <b>Delete Account</b>
            <DeleteAccountModal />
          </MenuItem>
          <MenuItem icon={<Icon as={FaSignOutAlt} boxSize={6} pl={0.5} />} onClick={() => clustersStore.setState({isLogoutModalOpen: true})}>
            <b>Logout</b>
            <LogoutModal />
          </MenuItem>
        </MenuList>
      </Menu>

      <Spacer />
      
      {/* Open Menu Button */}
      <IconButton aria-label='open drawer' onClick={() => clustersStore.setState({isDrawerOpen: true})} icon={<HamburgerIcon />} />

      {/* Menu Drawer */}
      <MenuDrawer />
    </Flex>
  )
}

export default Navbar;