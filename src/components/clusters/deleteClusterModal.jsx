import React from 'react';
import {
  Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';

const DeleteClusterModal = ({
  isDeleteClusterOpen, setIsDeleteClusterOpen, deletedClusterObj, handleDeleteCluster
}) => {

  return (
    <Modal isOpen={isDeleteClusterOpen} onClose={ () => setIsDeleteClusterOpen(false) } motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Cluster: {deletedClusterObj.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure? You can't undo this action afterwards.
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={ () => setIsDeleteClusterOpen(false) }>Cancel</Button>
          <Button colorScheme='red' onClick={ () => handleDeleteCluster(deletedClusterObj) }>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteClusterModal;