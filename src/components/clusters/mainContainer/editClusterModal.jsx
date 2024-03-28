import React from 'react';
import {
  FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputLeftElement, Button, Icon, useToast,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import { SiApachekafka } from 'react-icons/si';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { clustersStore } from '../../../store/clusters';
import { handleEditClusterClose, handleEditCluster, handleClusterNameChange, handleClusterPortChange } from '../../../utils/clustersHandler';

const EditClusterModal = () => {

  // declare state variables
  const clusterName = clustersStore(state => state.clusterName);
  const isClusterNameEmpty = clustersStore(state => state.isClusterNameEmpty);
  const clusterPort = clustersStore((state) => state.clusterPort);
  const isClusterPortEmpty = clustersStore((state) => state.isClusterPortEmpty);
  const isEditClusterOpen = clustersStore((state) => state.isEditClusterOpen);
  const oldClusterName = clustersStore((state) => state.oldClusterName);
  const editClusterID = clustersStore(state => state.editClusterID);

  // declare reference modal initial focus
  const initialRef = React.useRef(null);

  // declare variable to use toast
  const toast = useToast();

  return (

    /* Edit Cluster Modal */
    <Modal isOpen={isEditClusterOpen} onClose={handleEditClusterClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent top='3.5rem'>

        {/* Title */}
        <ModalHeader>Edit Cluster: {oldClusterName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          {/* Name Input */}
          <FormControl isRequired isInvalid={isClusterNameEmpty} mb={8}>
            <FormLabel fontWeight = 'bold'>New Name: {clusterName}</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Icon as={MdDriveFileRenameOutline} boxSize={5} />
              </InputLeftElement>
              <Input
                isRequired value={clusterName} placeholder='Cluster #' size='md' ref={initialRef}
                onChange={handleClusterNameChange} onFocus={() => {clustersStore.setState({isClusterNameEmpty: false})}}
              />
            </InputGroup>
            <FormErrorMessage><b>Cluster name</b>&nbsp;shouldn't be Empty</FormErrorMessage>
          </FormControl>

          {/* Port Input */}
          <FormControl isRequired isInvalid={isClusterPortEmpty} mb={8}>
            <FormLabel fontWeight = 'bold' mb='0.5rem'>New Hostname & Port: {clusterPort}</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Icon as={SiApachekafka} boxSize={5} />
              </InputLeftElement>
              <Input
                isRequired value={clusterPort} placeholder='localhost: #' size='md'
                onChange={handleClusterPortChange} onFocus={() => {clustersStore.setState({isClusterPortEmpty: false})}}
              />
            </InputGroup>
            <FormErrorMessage><b>Cluster port</b>&nbsp;shouldn't be Empty</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>

          {/* Cancel Button */}
          <Button mr={3} onClick={handleEditClusterClose}>Cancel</Button>

          {/* Submit Button */}
          <Button colorScheme='blue' onClick={() => handleEditCluster(toast, editClusterID)}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditClusterModal;