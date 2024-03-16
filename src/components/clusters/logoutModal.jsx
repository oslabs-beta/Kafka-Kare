import React from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import { clustersStore } from '../../store/clusters';

const LogoutModal = ({ handleLogout }) => {

  // declare state variables
  const isLogoutModalOpen = clustersStore(state => state.isLogoutModalOpen);

  return (

    /* Delete Cluster Modal */
    <Modal isOpen={isLogoutModalOpen} onClose={() => clustersStore.setState({isLogoutModalOpen: false})} motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent top='3.5rem'>
        <ModalHeader>Logout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to log out?
        </ModalBody>
        <ModalFooter>

          {/* Cancel Button */}
          <Button mr={3} onClick={() => clustersStore.setState({isLogoutModalOpen: false})}>Cancel</Button>

          {/* Delete Button */}
          <Button colorScheme='blackAlpha' onClick={() => handleLogout()}>Logout</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;