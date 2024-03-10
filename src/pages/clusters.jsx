'use client'

import React, { useState, useEffect } from 'react';
import {
  Box, Flex, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Text, Button, Spacer, Heading, Stack, StackDivider, Link, Code,
  Input, InputGroup, InputLeftElement, InputRightElement, IconButton, Image,
  FormControl, FormLabel, FormErrorMessage,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Search2Icon, AddIcon, CloseIcon, HamburgerIcon, EditIcon } from '@chakra-ui/icons';
import path from 'path';
import { userStore } from '../store/user';
import ClustersDrawer from '../components/clusters/clustersDrawer';
import AddClusterModal from '../components/clusters/addClusterModal';
import EditClusterModal from '../components/clusters/editClusterModal';

export default function Home() {
  const { push } = useRouter();
  const [ clusterArray, setClusterArray ] = useState([]);
  const [ clusterDisplayArray, setClusterDisplayArray ] = useState([]);
  useEffect(() => {
     const fetchClusters = async () => {
      try {
        const response = await axios('http://localhost:3001/clusters/userClusters', {withCredentials: true});
        console.log(response.data);
        setClusterArray(response.data);
        setClusterDisplayArray(response.data);
      }
      catch (err) {console.log(err)}
    };
    fetchClusters();
  }, []);
  // testing
  const updateUser = userStore((state) => state.updateUsername);
  const [ isNewClusterOpen, setIsNewClusterOpen ] = useState();
  const handleNewClusterClose = () => {
    setClusterName('');
    setClusterPort('');
    setIsClusterNameEmpty(false);
    setIsClusterPortEmpty(false);
    setIsNewClusterOpen(false);
  }
  const handleNewCluster = async () => {
    if (clusterName === '') setIsClusterNameEmpty(true);
    if (clusterPort === '') setIsClusterPortEmpty(true);
    if (clusterName !== '' && clusterPort !== '') {
      setClusterName('');
      setClusterPort('');
      setIsClusterNameEmpty(false);
      setIsClusterPortEmpty(false);
      setIsNewClusterOpen(false);
      const response = await axios.post('http:/localhost:3001/clusters/addCluster', {name: clusterName, hostnameAndPort: clusterPort}, {withCredentials: true});
      console.log(response.data);
      setClusterArray(clusterArray.concat(response.data));
      setClusterDisplayArray(clusterArray.concat(response.data));
    }
  };

  const [ isEditClusterOpen, setIsEditClusterOpen ] = useState();
  const handleEditClusterClose = () => {
    setClusterName('');
    setClusterPort('');
    setIsClusterNameEmpty(false);
    setIsClusterPortEmpty(false);
    setIsEditClusterOpen(false);
  }
  const handleEditCluster = async (editClusterID) => {
    if (clusterName === '') setIsClusterNameEmpty(true);
    if (clusterPort === '') setIsClusterPortEmpty(true);
    if (clusterName !== '' && clusterPort !== '') {
      setClusterName('');
      setClusterPort('');
      setIsClusterNameEmpty(false);
      setIsClusterPortEmpty(false);
      setIsEditClusterOpen(false);
      const response = await axios.patch(`http://localhost:3001//clusters/${editClusterID}`, {name: clusterName, hostnameAndPort: clusterPort}, {withCredentials: true});
      console.log(response.data);
      // setClusterArray(clusterArray.concat(response.data));
      // setClusterDisplayArray(clusterArray.concat(response.data));
    }
  }

  const [ deletedClusterObj, setDeletedClusterObj ] = useState({});
  const [ isDeleteClusterOpen, setIsDeleteClusterOpen ] = useState(false);
  const handleDeleteClusterClose = () => {
    setIsDeleteClusterOpen(false);
  }
  const handleDeleteCluster = async (deletedClusterObj) => {
    for (const [index, clusterObj] of clusterDisplayArray.entries()) {
      if (clusterObj.name === deletedClusterObj.name && clusterObj.hostnameAndPort === deletedClusterObj.hostnameAndPort) {
        setClusterDisplayArray(clusterDisplayArray.toSpliced(index, 1));
        break;
      }
    }
    for (const [index, clusterObj] of clusterArray.entries()) {
      if (clusterObj.name === deletedClusterObj.name && clusterObj.hostnameAndPort === deletedClusterObj.hostnameAndPort) {
        setClusterArray(clusterArray.toSpliced(index, 1));
        break;
      }
    }
    setIsDeleteClusterOpen(false);
    const response = await axios.delete(`http://localhost:3001//clusters/${deletedClusterObj._id}`);
    console.log(response.data);
  }

  const [ clusterName, setClusterName ] = useState('');
  const [ isClusterNameEmpty, setIsClusterNameEmpty ] = useState(false);
  const handleClusterNameChange = (event) => {
    setIsClusterNameEmpty(false);
    setClusterName(event.target.value);
  };
  const [ clusterPort, setClusterPort ] = useState('');
  const [ isClusterPortEmpty, setIsClusterPortEmpty ] = useState(false);
  const handleClusterPortChange = (event) => {
    setIsClusterPortEmpty(false);
    setClusterPort(event.target.value);
  };
  const [ clusterSearchValue, setClusterSearchValue ] = useState('');
  const handleClusterSearchValueChange = (curClusterSearchValue) => {
    const newClusterDisplayArray = [];
    setClusterSearchValue(curClusterSearchValue);
    clusterArray.map((clusterObj) => {
      if (clusterObj.name.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
      || clusterObj.hostnameAndPort.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1) {
        newClusterDisplayArray.push(clusterObj);
      }
    });
    setClusterDisplayArray(newClusterDisplayArray);
  }
  const [ isDrawerOpen, setIsDrawerOpen ] = useState('');
  const drawerBtnRef = React.useRef();

  return (
    <Box width="full" height="100vh">
      <Flex p={6} px={100} width="full" borderWidth={1} boxShadow="lg">
        <Image src='/kafka-kare-logo.png' h={10} borderRadius={8}/>
        <Spacer />
        <InputGroup w={["25%", "25%", "40%", "56%", "66%", "72%"]}>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon  />
          </InputLeftElement>
          <Input type='tel' placeholder='Name or Port' value={clusterSearchValue} onChange={(event) => handleClusterSearchValueChange(event.target.value)}/>
          <InputRightElement>
          <IconButton _hover={''} isRound={true} aria-label='clean cluster search' size='xs' icon={<CloseIcon color='gray.500'/> } variant='ghost'
          onClick = { () => handleClusterSearchValueChange('') }/>
          </InputRightElement>
        </InputGroup>
        <Spacer />
        <Button onClick={ () => setIsNewClusterOpen(true) } leftIcon={<AddIcon />} colorScheme='teal' variant='solid'>
          New Cluster
        </Button>
        <AddClusterModal
          isNewClusterOpen={isNewClusterOpen} handleNewClusterClose={handleNewClusterClose} handleNewCluster={handleNewCluster}
          isClusterNameEmpty={isClusterNameEmpty} clusterName={clusterName} handleClusterNameChange={handleClusterNameChange}
          isClusterPortEmpty={isClusterPortEmpty} clusterPort={clusterPort} handleClusterPortChange={handleClusterPortChange}
        />
        <Spacer />
        <IconButton aria-label='open drawer' icon={<HamburgerIcon onClick={() => setIsDrawerOpen(true)}/>} />
        <ClustersDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      </Flex>
      <Box width="full" justifyContent="center" p={8} style={{height: 'calc(100% - 90px)'}} overflowY="scroll">
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
          {clusterDisplayArray.map((clusterObj, index) => (
            <Card id={'cluster' + index} key={'clusterCard'+index}>
              <CardHeader>
                <Flex>
                  <Heading size='md'>{clusterObj.name}</Heading>
                  <Spacer />
                  <IconButton _hover={''} isRound={true} aria-label='delete cluster' size='xs' icon={<CloseIcon color='gray.500'/> } variant='ghost'
                  onClick = { () => { setIsDeleteClusterOpen(true); setDeletedClusterObj(clusterObj); } }/>
                </Flex>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Hostname & Port
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {clusterObj.hostnameAndPort}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Hostname & Port
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {clusterObj.hostnameAndPort}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
              <CardFooter>
                <Flex width="full">
                  <Button w='80%' onClick={ () => push(path.join(__dirname, './graphs')) }>Dashboard</Button>
                  <Spacer />
                  <IconButton aria-label='edit cluster' variant='ghost' icon={<EditIcon boxSize={5} onClick={() => setIsEditClusterOpen(true)}/>} />
                  <EditClusterModal
                    isEditClusterOpen={isEditClusterOpen} handleEditClusterClose={handleEditClusterClose} handleEditCluster={handleEditCluster}
                    isClusterNameEmpty={isClusterNameEmpty} clusterName={clusterName} handleClusterNameChange={handleClusterNameChange}
                    isClusterPortEmpty={isClusterPortEmpty} clusterPort={clusterPort} handleClusterPortChange={handleClusterPortChange}
                    editClusterID={clusterObj._id}
                  />
                </Flex>
              </CardFooter>
            </Card>
          ))}
          <Modal isOpen={isDeleteClusterOpen} onClose={ () => setIsDeleteClusterOpen(false) } motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Delete Cluster: {deletedClusterObj.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Are you sure? You can't undo this action afterwards.
              </ModalBody>
              <ModalFooter>
                <Button mr={3} onClick={ () => setIsDeleteClusterOpen(false) }>Cancel</Button>
                <Button colorScheme='red' onClick={ () => handleDeleteCluster(deletedClusterObj) }>Delete</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </SimpleGrid>
      </Box>
    </Box>
  );
}