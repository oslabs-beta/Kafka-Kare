import React from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useToast, useColorModeValue
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { clustersStore } from '../../../../store/clusters';
import { handleLogout } from '../../../../utils/clustersHandler';

const LogoutModal = () => {
  const deleteButtonColor = useColorModeValue('blackAlpha', 'facebook');

  // declare state variables
  const isLogoutModalOpen = clustersStore(state => state.isLogoutModalOpen);
  const username = clustersStore(state => state.username);

  // declare variable to use toast and push
  const { push } = useRouter();
  const toast = useToast();

  return (

    /* Delete Cluster Modal */
    <Modal isOpen={isLogoutModalOpen} onClose={() => clustersStore.setState({isLogoutModalOpen: false})} motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent top='3.5rem'>
        <ModalHeader>Logout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <b>{username}</b>, are you sure you want to log out?
        </ModalBody>
        <ModalFooter>

          {/* Cancel Button */}
          <Button mr={3} onClick={() => clustersStore.setState({isLogoutModalOpen: false})}>Cancel</Button>

          {/* Delete Button */}
          <Button colorScheme={deleteButtonColor} onClick={() => handleLogout(toast, push)}>Logout</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;