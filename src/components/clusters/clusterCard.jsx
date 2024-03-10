import React, { useState, useEffect } from 'react';
import {
  Flex, Heading, Spacer, IconButton, Stack, StackDivider, Box, Text, Button, Icon,
  Card, CardHeader, CardBody, CardFooter,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { RxStar, RxStarFilled } from "react-icons/rx";
import path from 'path';
import { clustersStore } from '../../store/clusters';

const ClusterCard = ({ index, clusterObj, handleFavoriteChange }) => {
  const { push } = useRouter();

  // actions when editClusterModal open
  const handleEditClusterOpen = () => {
    clustersStore.setState({isEditClusterOpen: true});
    clustersStore.setState({clusterName: clusterObj.name});
    clustersStore.setState({oldClusterName: clusterObj.name});
    clustersStore.setState({clusterPort: clusterObj.hostnameAndPort});
    clustersStore.setState({editClusterID: clusterObj._id});
  }

  // actions when deleteClusterModal open
  const handleDeleteClusterOpen = () => {
    clustersStore.setState({isDeleteClusterOpen: true});
    clustersStore.setState({oldClusterName: clusterObj.name});
    clustersStore.setState({deleteClusterID: clusterObj._id});
  }

  // declare state variables
  const [ favoriteCluster, setFavoriteCluster ] = useState(false);
  useEffect(() => {
    setFavoriteCluster(clusterObj.favorite);
  }, []);
  
  return (

    /* Cluster Card */
    <Card id={'cluster'+index} >
      <CardHeader>
        <Flex>
          {/* Title */}
          <Heading w='75%' fontSize={22} m={'auto'}>{clusterObj.name}</Heading>

          <Spacer />

          {/* Favorite Button */}
          <IconButton
            _hover={''} isRound={true} aria-label='add favorite cluster' variant='ghost'
            icon={favoriteCluster ? <Icon as={RxStarFilled} color='yellow.300' boxSize={6} /> : <Icon as={RxStar} boxSize={5} />}
            onClick = {() => {setFavoriteCluster(!favoriteCluster); handleFavoriteChange(clusterObj._id);}}
          />

          <Spacer />

          {/* Delete Cluster Button */}
          <IconButton
            _hover={''} isRound={true} aria-label='delete cluster' mr={1} icon={<CloseIcon color='gray.500' boxSize={3} />} variant='ghost'
            onClick = {() => handleDeleteClusterOpen()}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>

          {/* Hostname and Port */}
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Hostname & Port
            </Heading>
            <Text pt='2' fontSize='sm'>
              {clusterObj.hostnameAndPort}
            </Text>
          </Box>

          {/* Any Information */}
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

          {/* Graphs Button */}
          <Button w='80%' onClick={() => push(path.join(__dirname, './graphs'))}>Dashboard</Button>

          <Spacer />

          {/* Edit Cluster Button */}
          <IconButton aria-label='edit cluster' variant='ghost' onClick={() => handleEditClusterOpen()} icon={<EditIcon boxSize={5} />} />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default ClusterCard;