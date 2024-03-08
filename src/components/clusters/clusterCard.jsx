import React, {useState} from 'react';
import {
  Flex, Heading, Spacer, IconButton, Stack, StackDivider, Box, Text, Button, Icon,
  Card, CardHeader, CardBody, CardFooter,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { CloseIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import { RxStar, RxStarFilled } from "react-icons/rx";
import path from 'path';

const ClusterCard = ({
  index, clusterObj, setIsDeleteClusterOpen, setDeletedClusterObj, setIsEditClusterOpen,
  seteditClusterID, setClusterName, setClusterPort, setOldClusterName
}) => {
  const { push } = useRouter();
  const handleEditClusterOpen = () => {
    setIsEditClusterOpen(true);
    setClusterName(clusterObj.name);
    setOldClusterName(clusterObj.name);
    setClusterPort(clusterObj.hostnameAndPort);
    seteditClusterID(clusterObj._id);
  }
  const [ favoriteCluster, setFavoriteCluster ] = useState(false);
  // <Icon as={HiOutlineStar} color={favoriteCluster ? 'black' : 'white'} boxSize={6}/>
  return (
    <Card id={'cluster' + index} key={'clusterCard'+index}>
      <CardHeader>
        <Flex>
          <Heading w='75%' fontSize={22} m={'auto'}>{clusterObj.name}</Heading>
          <Spacer />
          <IconButton _hover={''} isRound={true} aria-label='add favorite cluster' icon={favoriteCluster ? <Icon as={RxStarFilled} color='yellow.300' boxSize={5}/> : <Icon as={RxStar} boxSize={5}/>} variant='ghost'
          onClick = { () => { setFavoriteCluster(!favoriteCluster) } }/>
          <Spacer />
          <IconButton _hover={''} isRound={true} aria-label='delete cluster' mr={1} icon={<CloseIcon color='gray.500'  boxSize={3}/> } variant='ghost'
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
          <IconButton aria-label='edit cluster' variant='ghost' icon={<EditIcon boxSize={5} onClick={() => handleEditClusterOpen()}/>} />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default ClusterCard;