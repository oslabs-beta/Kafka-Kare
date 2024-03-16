import React from 'react';
import {
  FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputLeftElement, Button, Icon, useToast,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import { RiLockPasswordLine, RiRotateLockLine } from "react-icons/ri";
import { clustersStore } from '../../store/clusters';
import { handleChangePasswordClose, handleChangePassword } from '../../utils/clustersHandler';

const ChangePasswordModal = () => {

  // declare state variables
  const isOldPasswordEmpty = clustersStore((state) => state.isOldPasswordEmpty);
  const isNewPasswordEmpty = clustersStore((state) => state.isNewPasswordEmpty);
  const isChangePasswordModalOpen = clustersStore((state) => state.isChangePasswordModalOpen);

  // declare reference modal initial focus
  const initialRef = React.useRef(null);

  // declare variable to use toast
  const toast = useToast();

  return (

    /* Edit Cluster Modal */
    <Modal isOpen={isChangePasswordModalOpen} onClose={handleChangePasswordClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent top='3.5rem'>

        {/* Title */}
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          {/* Name Input */}
          <FormControl isRequired isInvalid={isOldPasswordEmpty} mb={8}>
            <FormLabel fontWeight = 'bold'>Old password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Icon as={RiLockPasswordLine} boxSize={5} />
              </InputLeftElement>
              <Input
                isRequired placeholder='*****' size='md' ref={initialRef}
                onChange={(e) => {clustersStore.setState({oldPassword: e.target.value}); clustersStore.setState({isOldPasswordEmpty: false});}}
              />
            </InputGroup>
            <FormErrorMessage><b>Old password</b>&nbsp;shouldn't be Empty</FormErrorMessage>
          </FormControl>

          {/* Port Input */}
          <FormControl isRequired isInvalid={isNewPasswordEmpty} mb={8}>
            <FormLabel fontWeight = 'bold' mb='0.5rem'>New Password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Icon as={RiRotateLockLine} boxSize={6} />
              </InputLeftElement>
              <Input
                isRequired placeholder='*****' size='md'
                onChange={(e) => {clustersStore.setState({newPassword: e.target.value}); clustersStore.setState({isNewPasswordEmpty: false});}}
              />
            </InputGroup>
            <FormErrorMessage><b>New Password</b>&nbsp;shouldn't be Empty</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>

          {/* Cancel Button */}
          <Button mr={3} onClick={handleChangePasswordClose}>Cancel</Button>

          {/* Submit Button */}
          <Button colorScheme='blue' onClick={() => handleChangePassword(toast)}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;