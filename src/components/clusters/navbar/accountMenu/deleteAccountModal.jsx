import React, { useState } from 'react';
import {
  FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputLeftElement, InputRightElement, Button, Icon, useToast,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Alert, AlertIcon, AlertTitle, AlertDescription,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { RiLockPasswordLine } from 'react-icons/ri';
import { clustersStore } from '../../../../store/clusters';
import { handleDeleteAccountClose, handleDeleteAccount } from '../../../../utils/clustersHandler';

const DeleteAccountModal = () => {

  // declare state variables
  const username = clustersStore((state) => state.username);
  const oldPassword = clustersStore((state) => state.oldPassword);
  const isOldPasswordEmpty = clustersStore((state) => state.isOldPasswordEmpty);
  const isDeleteAccountModalOpen = clustersStore((state) => state.isDeleteAccountModalOpen);
  const [showPassword, setShowPassword] = useState(false);

  // declare reference modal initial focus
  const initialRef = React.useRef(null);

  // declare variable to use toast and push
  const toast = useToast();
  const { push } = useRouter();

  return (

    /* Delete Account Modal */
    <Modal isOpen={isDeleteAccountModalOpen} onClose={handleDeleteAccountClose} motionPreset='slideInBottom' initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent top='3.5rem'>

        {/* Title */}
        <ModalHeader>Delete Account: {username}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          {/* Warning */}
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
                isRequired type={showPassword ? 'text' : 'password'} placeholder='*****' size='md' ref={initialRef} value={oldPassword}
                onChange={(e) => {clustersStore.setState({oldPassword: e.target.value.trim()});}} onFocus={() => {clustersStore.setState({isOldPasswordEmpty: false});}}
              />
              <InputRightElement w={20}>
                <Button h={7} w={16} size='sm' onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</Button>
              </InputRightElement>
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