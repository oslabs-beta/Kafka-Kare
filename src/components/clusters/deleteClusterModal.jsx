import React from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import { clustersStore } from '../../store/clusters';

const DeleteClusterModal = ({ handleDeleteCluster }) => {
  const deletedClusterObj = clustersStore(state => state.deletedClusterObj);
  const isDeleteClusterOpen = clustersStore(state => state.isDeleteClusterOpen);

  return (
    <Modal isOpen={isDeleteClusterOpen} onClose={ () => clustersStore.setState({isDeleteClusterOpen: false}) } motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Cluster: {deletedClusterObj.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure? You can't undo this action afterwards.
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={ () => clustersStore.setState({isDeleteClusterOpen: false}) }>Cancel</Button>
          <Button colorScheme='red' onClick={ () => handleDeleteCluster(deletedClusterObj) }>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteClusterModal;