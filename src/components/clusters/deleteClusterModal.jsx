import React from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useToast
} from '@chakra-ui/react';
import { clustersStore } from '../../store/clusters';
import { handleDeleteCluster } from '../../utils/clustersHandler';

const DeleteClusterModal = () => {

  // declare state variables
  const oldClusterName = clustersStore((state) => state.oldClusterName);
  const deleteClusterID = clustersStore(state => state.deleteClusterID);
  const isDeleteClusterOpen = clustersStore(state => state.isDeleteClusterOpen);

  // declare variable to use toast
  const toast = useToast();

  return (

    /* Delete Cluster Modal */
    <Modal isOpen={isDeleteClusterOpen} onClose={() => clustersStore.setState({isDeleteClusterOpen: false})} motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent top='3.5rem'>
        <ModalHeader>Delete Cluster: {oldClusterName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure? You can't undo this action afterwards.
        </ModalBody>
        <ModalFooter>

          {/* Cancel Button */}
          <Button mr={3} onClick={() => clustersStore.setState({isDeleteClusterOpen: false})}>Cancel</Button>

          {/* Delete Button */}
          <Button colorScheme='red' onClick={() => handleDeleteCluster(toast, deleteClusterID)}>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteClusterModal;