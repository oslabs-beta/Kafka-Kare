import React from 'react';
import {
  FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputLeftElement, Button, Icon, useToast,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Alert, AlertIcon, AlertTitle, AlertDescription,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { RiLockPasswordLine, RiRotateLockLine } from "react-icons/ri";
import { clustersStore } from '../../store/clusters';
import { handleDeleteAccountClose, handleDeleteAccount } from '../../utils/clustersHandler';

const DeleteAccountModal = () => {

  // declare state variables
  const isOldPasswordEmpty = clustersStore((state) => state.isOldPasswordEmpty);
  const isDeleteAccountModalOpen = clustersStore((state) => state.isDeleteAccountModalOpen);

  // declare reference modal initial focus
  const initialRef = React.useRef(null);

  // declare variable to use toast and push
  const toast = useToast();
  const { push } = useRouter();

  return (

    /* Delete Account Modal */
    <Modal isOpen={isDeleteAccountModalOpen} onClose={handleDeleteAccountClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent top='3.5rem'>

        {/* Title */}
        <ModalHeader>Delete Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          <Alert status='error' variant='left-accent' mb={4} borderRadius={10} borderInlineStartWidth={6}>
            <AlertIcon />
            <AlertDescription>This will delete your <b>account</b> and <b>clusters</b>. You can't undo this action afterwards.</AlertDescription>
          </Alert>

          {/* Name Input */}
          <FormControl isRequired isInvalid={isOldPasswordEmpty} mb={8}>
            <FormLabel fontWeight = 'bold'>Password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Icon as={RiLockPasswordLine} boxSize={5} />
              </InputLeftElement>
              <Input
                isRequired placeholder='*****' size='md' ref={initialRef}
                onChange={(e) => {clustersStore.setState({oldPassword: e.target.value}); clustersStore.setState({isOldPasswordEmpty: false});}}
              />
            </InputGroup>
            <FormErrorMessage><b>Password</b>&nbsp;shouldn't be Empty</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>

          {/* Cancel Button */}
          <Button mr={3} onClick={handleDeleteAccountClose}>Cancel</Button>

          {/* Delete Button */}
          <Button colorScheme='red' onClick={() => handleDeleteAccount(toast, push)}>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAccountModal;