import React, { useEffect } from 'react';
import {
  Box, Flex, SimpleGrid, Button, Spacer, Image,
  Input, InputGroup, InputLeftElement, InputRightElement, IconButton,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Search2Icon, AddIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import path from 'path';
import { clustersStore } from '../store/clusters';
import MenuDrawer from '../components/clusters/menuDrawer';
import AddClusterModal from '../components/clusters/addClusterModal';
import ClusterCard from '../components/clusters/clusterCard';
import EditClusterModal from '../components/clusters/editClusterModal';
import DeleteClusterModal from '../components/clusters/deleteClusterModal';

export default function Home() {
  const { push } = useRouter();
  const clusterArray = clustersStore(state => state.clusterArray);
  const clusterDisplayArray = clustersStore(state => state.clusterDisplayArray);
  useEffect(() => {
     const fetchClusters = async () => {
      try {
        const response = await axios('/clusters/userClusters', { credentials: 'include' });
        console.log(response.data);
        clustersStore.setState({clusterArray: response.data});
        clustersStore.setState({clusterDisplayArray: response.data});
      }
      catch (err) {console.log(err)}
    };
    fetchClusters();
  }, []);

  const isNewClusterOpen = clustersStore(state => state.isNewClusterOpen);
  const handleNewClusterClose = () => {
    clustersStore.setState({clusterName: ''});
    clustersStore.setState({clusterPort: ''});
    clustersStore.setState({isClusterNameEmpty: false});
    clustersStore.setState({isClusterPortEmpty: false});
    clustersStore.setState({isNewClusterOpen: false});
  }
  const handleNewCluster = async () => {
    if (clusterName === '') clustersStore.setState({isClusterNameEmpty: true});
    if (clusterPort === '') clustersStore.setState({isClusterPortEmpty: true});
    if (clusterName !== '' && clusterPort !== '') {
      handleNewClusterClose();
      const response = await axios.post('/clusters/addCluster', {name: clusterName, hostnameAndPort: clusterPort});
      console.log(response.data);
      clustersStore.setState({clusterArray: clusterArray.concat(response.data)});
      clustersStore.setState({clusterDisplayArray: clusterArray.concat(response.data)});
    }
  };

  const editClusterID = clustersStore(state => state.editClusterID);
  const isEditClusterOpen = clustersStore(state => state.isEditClusterOpen);
  const oldClusterName = clustersStore(state => state.oldClusterName);
  const handleEditClusterClose = () => {
    clustersStore.setState({clusterName: ''});
    clustersStore.setState({clusterPort: ''});
    clustersStore.setState({isClusterNameEmpty: false});
    clustersStore.setState({isClusterPortEmpty: false});
    clustersStore.setState({isEditClusterOpen: false});
  }
  const handleEditCluster = async () => {
    if (clusterName === '') clustersStore.setState({isClusterNameEmpty: true});
    if (clusterPort === '') clustersStore.setState({isClusterPortEmpty: true});
    if (clusterName !== '' && clusterPort !== '') {
      handleEditClusterClose();
      for (const [index, clusterObj] of clusterDisplayArray.entries()) {
        if (clusterObj._id === editClusterID) {
          clustersStore.setState({clusterDisplayArray: clusterDisplayArray.toSpliced(index, 1, {...clusterDisplayArray[index], name: clusterName, hostnameAndPort: clusterPort})});
          break;
        }
      }
      for (const [index, clusterObj] of clusterArray.entries()) {
        if (clusterObj._id === editClusterID) {
          clustersStore.setState({clusterArray: clusterArray.toSpliced(index, 1, {...clusterArray[index], name: clusterName, hostnameAndPort: clusterPort})});
          break;
        }
      }
      const response = await axios.patch(`/clusters/${editClusterID}`, {name: clusterName, hostnameAndPort: clusterPort});
      console.log(response.data);
    }
  }

  const handleDeleteCluster = async (deletedClusterObj) => {
    for (const [index, clusterObj] of clusterDisplayArray.entries()) {
      if (clusterObj.name === deletedClusterObj.name && clusterObj.hostnameAndPort === deletedClusterObj.hostnameAndPort) {
        clustersStore.setState({clusterDisplayArray: clusterDisplayArray.toSpliced(index, 1)});
        break;
      }
    }
    for (const [index, clusterObj] of clusterArray.entries()) {
      if (clusterObj.name === deletedClusterObj.name && clusterObj.hostnameAndPort === deletedClusterObj.hostnameAndPort) {
        clustersStore.setState({clusterArray: clusterArray.toSpliced(index, 1)});
        break;
      }
    }
    clustersStore.setState({isDeleteClusterOpen: false});
    const response = await axios.delete(`/clusters/${deletedClusterObj._id}`);
    console.log(response.data);
  }

  const clusterName = clustersStore(state => state.clusterName);
  const handleClusterNameChange = (event) => {
    clustersStore.setState({isClusterNameEmpty: false});
    clustersStore.setState({clusterName: event.target.value});
  };
  const clusterPort = clustersStore(state => state.clusterPort);
  const handleClusterPortChange = (event) => {
    clustersStore.setState({isClusterPortEmpty: false});
    clustersStore.setState({clusterPort: event.target.value});
  };
  const clusterSearchValue = clustersStore(state => state.clusterSearchValue);
  const handleClusterSearchValueChange = (curClusterSearchValue) => {
    const newClusterDisplayArray = [];
    clustersStore.setState({clusterSearchValue: curClusterSearchValue});
    clusterArray.map((clusterObj) => {
      if (clusterObj.name.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
      || clusterObj.hostnameAndPort.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1) {
        newClusterDisplayArray.push(clusterObj);
      }
    });
    clustersStore.setState({clusterDisplayArray: newClusterDisplayArray});
  }
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
          <Input type='tel' placeholder={'Name or Port'} value={clusterSearchValue}
          onChange={(event) => handleClusterSearchValueChange(event.target.value)}/>
          <InputRightElement>
          <IconButton _hover={''} isRound={true} aria-label='clean cluster search' size='xs' icon={<CloseIcon color='gray.500'/> }
          variant='ghost' onClick = { () => handleClusterSearchValueChange('') }/>
          </InputRightElement>
        </InputGroup>
        <Spacer />
        <Button onClick={ () => clustersStore.setState({isNewClusterOpen: true}) } leftIcon={<AddIcon />} colorScheme='teal' variant='solid'>
          New Cluster
        </Button>
        <AddClusterModal
          handleNewClusterClose={handleNewClusterClose} handleNewCluster={handleNewCluster}
          handleClusterNameChange={handleClusterNameChange} handleClusterPortChange={handleClusterPortChange}
        />
        <Spacer />
        <IconButton aria-label='open drawer' icon={<HamburgerIcon onClick={() => clustersStore.setState({isDrawerOpen: true})}/>} />
        <MenuDrawer />
      </Flex>
      <Box width="full" justifyContent="center" p={8} style={{height: 'calc(100% - 90px)'}} overflowY="scroll">
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
          {clusterDisplayArray.map((clusterObj, index) => (
            <ClusterCard key={'clusterCard'+index}
              index={index} clusterObj={clusterObj}
            />
          ))}
          <EditClusterModal handleEditClusterClose={handleEditClusterClose} handleEditCluster={handleEditCluster}
            handleClusterNameChange={handleClusterNameChange} handleClusterPortChange={handleClusterPortChange}
          />
          <DeleteClusterModal handleDeleteCluster={handleDeleteCluster} />
        </SimpleGrid>
      </Box>
    </Box>
  );
}