import React from 'react';
import {  Modal, ModalOverlay, ModalContent, CircularProgress } from '@chakra-ui/react';
import { clustersStore } from '../store/clusters'; 

const LoadingModal = () => {
  const isLoadingModalOpen = clustersStore(state => state.isLoadingModalOpen);

  return (
    <Modal
      size='xs' isCentered isOpen={isLoadingModalOpen} motionPreset='none'
      onClose={() => {clustersStore.setState({isLoadingModalOpen: false})}}
    >
      <ModalOverlay
        bg='whiteAlpha.600'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
      <ModalContent w='0' h='0' right='7rem' top='-7rem' borderRadius='7rem'>
        <CircularProgress isIndeterminate color='blue.400' size='14rem' thickness='0.6rem'/>
      </ModalContent>
    </Modal>
  );
}

export default LoadingModal;
