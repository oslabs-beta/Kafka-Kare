import React from 'react';
import {
  Icon, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider, Avatar,
} from '@chakra-ui/react';
import { MdOutlineLockReset } from 'react-icons/md';
import { RiImageAddFill, RiUserUnfollowFill, RiDownload2Fill } from 'react-icons/ri';
import { FaSignOutAlt } from 'react-icons/fa';
import { clustersStore } from '../../../store/clusters';
import ChangePasswordModal from './accountMenu/changePasswordModal';
import DeleteAccountModal from './accountMenu/deleteAccountModal';
import LogoutModal from './accountMenu/logoutModal';

const AccountMenu = () => {
  return (
    /* Account Menu */
    <Menu>
      <MenuButton as={Avatar} src='' display='-webkit-box' name='' boxSize={10} bg='gray.400' color='white' _hover={{cursor: 'pointer', bg: 'gray.500'}}/>
      <MenuList>

        {/* Change Password */}
        <MenuItem icon={<Icon as={MdOutlineLockReset} boxSize={6} />} onClick={() => clustersStore.setState({isChangePasswordModalOpen: true})}>
          <b>Change Password</b>
          <ChangePasswordModal />
        </MenuItem>
        <MenuItem icon={<Icon as={RiDownload2Fill} boxSize={6} />}><b>Download Information</b></MenuItem>
        <MenuItem icon={<Icon as={RiImageAddFill} boxSize={6} />}><b>Upload Image</b></MenuItem>

        {/* Delete Account */}
        <MenuItem icon={<Icon as={RiUserUnfollowFill} boxSize={6} />} onClick={() => clustersStore.setState({isDeleteAccountModalOpen: true})}>
          <b>Delete Account</b>
          <DeleteAccountModal />
        </MenuItem>

        {/* Logout */}
        <MenuItem icon={<Icon as={FaSignOutAlt} boxSize={6} pl={0.5} />} onClick={() => clustersStore.setState({isLogoutModalOpen: true})}>
          <b>Logout</b>
          <LogoutModal />
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default AccountMenu;