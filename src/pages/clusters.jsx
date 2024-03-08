import React, { useState, useEffect } from 'react';
import {
  Box, Flex, SimpleGrid, Button, Spacer,
  Input, InputGroup, InputLeftElement, InputRightElement, IconButton, Image,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Search2Icon, AddIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import path from 'path';
import { userStore } from '../store/user';
import MenuDrawer from '../components/clusters/menuDrawer';
import AddClusterModal from '../components/clusters/addClusterModal';
import ClusterCard from '../components/clusters/clusterCard';
import EditClusterModal from '../components/clusters/editClusterModal';
import DeleteClusterModal from '../components/clusters/deleteClusterModal';

export default function Home() {
  const { push } = useRouter();
  const [ clusterArray, setClusterArray ] = useState([]);
  const [ clusterDisplayArray, setClusterDisplayArray ] = useState([]);
  useEffect(() => {
     const fetchClusters = async () => {
      try {
        const response = await axios('/clusters/userClusters', { credentials: 'include' });
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
      handleNewClusterClose();
      const response = await axios.post('/clusters/addCluster', {name: clusterName, hostnameAndPort: clusterPort});
      console.log(response.data);
      setClusterArray(clusterArray.concat(response.data));
      setClusterDisplayArray(clusterArray.concat(response.data));
    }
  };

  const [ editClusterID, seteditClusterID ] = useState();
  const [ isEditClusterOpen, setIsEditClusterOpen ] = useState();
  const [ oldClusterName, setOldClusterName ] = useState();
  const handleEditClusterClose = () => {
    setClusterName('');
    setClusterPort('');
    setIsClusterNameEmpty(false);
    setIsClusterPortEmpty(false);
    setIsEditClusterOpen(false);
  }
  const handleEditCluster = async () => {
    if (clusterName === '') setIsClusterNameEmpty(true);
    if (clusterPort === '') setIsClusterPortEmpty(true);
    if (clusterName !== '' && clusterPort !== '') {
      handleEditClusterClose();
      for (const [index, clusterObj] of clusterDisplayArray.entries()) {
        if (clusterObj._id === editClusterID) {
          setClusterDisplayArray(clusterDisplayArray.toSpliced(index, 1, {...clusterDisplayArray[index], name: clusterName, hostnameAndPort: clusterPort}));
          break;
        }
      }
      for (const [index, clusterObj] of clusterArray.entries()) {
        if (clusterObj._id === editClusterID) {
          setClusterArray(clusterDisplayArray.toSpliced(index, 1, {...clusterDisplayArray[index], name: clusterName, hostnameAndPort: clusterPort}));
          break;
        }
      }
      const response = await axios.patch(`/clusters/${editClusterID}`, {name: clusterName, hostnameAndPort: clusterPort});
      console.log(response.data);
    }
  }

  const [ deletedClusterObj, setDeletedClusterObj ] = useState({});
  const [ isDeleteClusterOpen, setIsDeleteClusterOpen ] = useState(false);
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
    const response = await axios.delete(`/clusters/${deletedClusterObj._id}`);
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
  // const drawerBtnRef = React.useRef();

  return (
    <Box width="full" height="100vh">
      <Flex p={6} px={100} width="full" borderWidth={1} boxShadow="lg">
        <Image src='/kafka-kare-logo.png' h={10} borderRadius={8}/>
        <Spacer />
        <InputGroup w={["22%", "22%", "36%", "52%", "62%", "68%"]}>
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
        <MenuDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      </Flex>
      <Box width="full" justifyContent="center" p={8} style={{height: 'calc(100% - 90px)'}} overflowY="scroll">
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
          {clusterDisplayArray.map((clusterObj, index) => (
            <ClusterCard key={'clusterCard'+index} setOldClusterName={setOldClusterName}
              index={index} clusterObj={clusterObj} setIsDeleteClusterOpen={setIsDeleteClusterOpen} setDeletedClusterObj={setDeletedClusterObj}
              seteditClusterID={seteditClusterID} setIsEditClusterOpen={setIsEditClusterOpen} setClusterName={setClusterName} setClusterPort={setClusterPort}
            />
          ))}
          <EditClusterModal oldClusterName={oldClusterName}
            isEditClusterOpen={isEditClusterOpen} handleEditClusterClose={handleEditClusterClose} handleEditCluster={handleEditCluster}
            isClusterNameEmpty={isClusterNameEmpty} clusterName={clusterName} handleClusterNameChange={handleClusterNameChange}
            isClusterPortEmpty={isClusterPortEmpty} clusterPort={clusterPort} handleClusterPortChange={handleClusterPortChange}
          />
          <DeleteClusterModal
            isDeleteClusterOpen={isDeleteClusterOpen} setIsDeleteClusterOpen={setIsDeleteClusterOpen} deletedClusterObj={deletedClusterObj} handleDeleteCluster={handleDeleteCluster}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
}