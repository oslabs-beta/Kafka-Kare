import React from 'react';
import {
  FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputLeftElement, Button, Icon,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import { SiApachekafka } from "react-icons/si";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { clustersStore } from '../../store/clusters';

const AddClusterModal = ({
  handleNewClusterClose, handleClusterNameChange, handleClusterPortChange, handleNewCluster
}) => {
  const isNewClusterOpen = clustersStore((state) => state.isNewClusterOpen);
  const clusterName = clustersStore((state) => state.clusterName);
  const isClusterNameEmpty = clustersStore((state) => state.isClusterNameEmpty);
  const clusterPort = clustersStore((state) => state.clusterPort);
  const isClusterPortEmpty = clustersStore((state) => state.isClusterPortEmpty);

  return (
    <Modal isOpen={isNewClusterOpen} onClose={ handleNewClusterClose }>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Cluster</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid = { isClusterNameEmpty } mb={8}>
            <FormLabel fontWeight = "bold">&nbsp;Name: { clusterName }</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Icon as={MdDriveFileRenameOutline} boxSize={5}/>
              </InputLeftElement>
              <Input
                isRequired
                value = { clusterName }
                onChange = { handleClusterNameChange }
                placeholder = 'Cluster #'
                size = 'md'
              />
            </InputGroup>
            <FormErrorMessage><b>Cluster name</b>&nbsp;shouldn't be Empty</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={ isClusterPortEmpty } mb={8}>
            <FormLabel fontWeight="bold" mb='0.5rem'>&nbsp;Hostname & Port: { clusterPort }</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Icon as={SiApachekafka} boxSize={5}/>
              </InputLeftElement>
              <Input
                isRequired
                value = { clusterPort }
                onChange = { handleClusterPortChange }
                placeholder = 'localhost: #'
                size = 'md'
              />
            </InputGroup>
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