import React from 'react';
import {
  FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputLeftElement, Button, Icon,
  FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputLeftElement, Button, Icon,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import { SiApachekafka } from 'react-icons/si';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { clustersStore } from '../../store/clusters';

const AddClusterModal = ({
  handleNewClusterClose, handleClusterNameChange, handleClusterPortChange, handleNewCluster
  handleNewClusterClose, handleClusterNameChange, handleClusterPortChange, handleNewCluster
}) => {

  // declare state variables
  const isNewClusterOpen = clustersStore(state => state.isNewClusterOpen);
  const clusterName = clustersStore(state => state.clusterName);
  const isClusterNameEmpty = clustersStore(state => state.isClusterNameEmpty);
  const clusterPort = clustersStore(state => state.clusterPort);
  const isClusterPortEmpty = clustersStore(state => state.isClusterPortEmpty);

  // declare reference modal initial focus
  const initialRef = React.useRef(null);

  // declare state variables
  const isNewClusterOpen = clustersStore(state => state.isNewClusterOpen);
  const clusterName = clustersStore(state => state.clusterName);
  const isClusterNameEmpty = clustersStore(state => state.isClusterNameEmpty);
  const clusterPort = clustersStore(state => state.clusterPort);
  const isClusterPortEmpty = clustersStore(state => state.isClusterPortEmpty);

  // declare reference modal initial focus
  const initialRef = React.useRef(null);

  return (

    /* Add Cluster Modal */
    <Modal isOpen={isNewClusterOpen} onClose={handleNewClusterClose} initialFocusRef={initialRef}>

    /* Add Cluster Modal */
    <Modal isOpen={isNewClusterOpen} onClose={handleNewClusterClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent top='3.5rem'>

        {/* Title */}
        <ModalHeader>New Cluster</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          {/* Name Input */}
          <FormControl isRequired isInvalid={isClusterNameEmpty} mb={8}>
            <FormLabel fontWeight='bold'>&nbsp;Name: {clusterName}</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Icon as={MdDriveFileRenameOutline} boxSize={5} />
              </InputLeftElement>
              <Input
                isRequired value={clusterName} placeholder='Cluster #' size='md'
                onChange={handleClusterNameChange} ref={initialRef}
              />
            </InputGroup>
            <FormErrorMessage><b>Cluster name</b>&nbsp;shouldn't be Empty</FormErrorMessage>
          </FormControl>

          {/* Port Input */}
          <FormControl isRequired isInvalid={isClusterPortEmpty} mb={8}>
            <FormLabel fontWeight='bold' mb='0.5rem'>&nbsp;Hostname & Port: {clusterPort}</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Icon as={SiApachekafka} boxSize={5} />
              </InputLeftElement>
              <Input
                isRequired value={clusterPort} placeholder='localhost: #' size = 'md'
                onChange={handleClusterPortChange}
              />
            </InputGroup>
            <FormErrorMessage><b>Cluster port</b>&nbsp;shouldn't be Empty</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>

          {/* Cancel Button */}
          <Button mr={3} onClick={handleNewClusterClose}>Cancel</Button>

          {/* Submit Button */}
          <Button colorScheme='blue' onClick={handleNewCluster}>Submit</Button>

          {/* Cancel Button */}
          <Button mr={3} onClick={handleNewClusterClose}>Cancel</Button>

          {/* Submit Button */}
          <Button colorScheme='blue' onClick={handleNewCluster}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddClusterModal;