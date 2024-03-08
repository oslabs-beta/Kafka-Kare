import React from 'react';
import {
  FormControl, FormLabel, FormErrorMessage, Input, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';

const EditClusterModal = ({
  isEditClusterOpen, handleEditClusterClose, isClusterNameEmpty, clusterName, handleClusterNameChange,
  isClusterPortEmpty, clusterPort, handleClusterPortChange, handleEditCluster, editClusterID
}) => {

  return (
    <Modal isOpen={isEditClusterOpen} onClose={ handleEditClusterClose }>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Cluster: </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid = { isClusterNameEmpty } mb={8}>
            <FormLabel fontWeight = "bold">New Name: { clusterName }</FormLabel>
            <Input
              isRequired
              value = { clusterName }
              onChange = { handleClusterNameChange }
              placeholder = 'Cluster #'
              size = 'md'
            />
            <FormErrorMessage><b>Cluster name</b>&nbsp;shouldn't be Empty</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid = { isClusterPortEmpty } mb={8}>
            <FormLabel fontWeight = "bold" mb='0.5rem'>New Hostname & Port: { clusterPort }</FormLabel>
            <Input
              isRequired
              value = { clusterPort }
              onChange = { handleClusterPortChange }
              placeholder = 'localhost: #'
              size = 'md'
            />
            <FormErrorMessage><b>Cluster port</b>&nbsp;shouldn't be Empty</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={ handleEditClusterClose }>Cancel</Button>
          <Button colorScheme='blue' onClick={ () => handleEditCluster(editClusterID) }>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditClusterModal;