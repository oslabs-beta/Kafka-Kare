import React from 'react';
import {
  FormControl, FormLabel, FormErrorMessage, Input, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';

const AddClusterModal = ({
  isNewClusterOpen, handleNewClusterClose, isClusterNameEmpty, clusterName, handleClusterNameChange,
  isClusterPortEmpty, clusterPort, handleClusterPortChange, handleNewCluster
}) => {

  return (
    <Modal isOpen={isNewClusterOpen} onClose={ handleNewClusterClose }>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Cluster</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid = { isClusterNameEmpty } mb={8}>
            <FormLabel fontWeight = "bold">Name: { clusterName }</FormLabel>
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
            <FormLabel fontWeight = "bold" mb='0.5rem'>Hostname & Port: { clusterPort }</FormLabel>
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
          <Button mr={3} onClick={ handleNewClusterClose }>Cancel</Button>
          <Button colorScheme='blue' onClick={ handleNewCluster }>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddClusterModal;