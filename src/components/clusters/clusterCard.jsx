import React from 'react';
import {
  Flex, Heading, Spacer, IconButton, Stack, StackDivider, Box, Text, Button, Icon, useToast,
  Card, CardHeader, CardBody, CardFooter,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { RxStar, RxStarFilled } from 'react-icons/rx';
import path from 'path';
import { handleEditClusterOpen, handleDeleteClusterOpen, handleFavoriteChange } from '../../utils/clustersHandler';

const ClusterCard = ({ clusterObj }) => {
  
  // declare variable to use toast and push
  const { push } = useRouter();
  const toast = useToast();
  
  return (

    /* Cluster Card */
    <Card>
      <CardHeader>
        <Flex>
          {/* Title */}
          <Heading w='75%' fontSize={22} m={'auto'}>{clusterObj.name}</Heading>

          <Spacer />

          {/* Favorite Button */}
          <IconButton
            _hover={''} isRound={true} aria-label='add favorite cluster' variant='ghost'
            icon={clusterObj.favorite ? <Icon as={RxStarFilled} color='yellow.300' boxSize={6} /> : <Icon as={RxStar} boxSize={5} />}
            onClick = {() => {handleFavoriteChange(toast, clusterObj._id);}}
          />

          <Spacer />

          {/* Delete Cluster Button */}
          <IconButton
            _hover={''} isRound={true} aria-label='delete cluster' mr={1} icon={<CloseIcon color='gray.500' boxSize={3} />} variant='ghost'
            onClick = {() => handleDeleteClusterOpen(clusterObj)}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={4}>

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
             Number of Brokers
            </Heading>
            <Text pt='2' fontSize='sm'>
              {clusterObj.numberOfBrokers}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter>
        <Flex width='full'>

          {/* Graphs Button */}
          <Button w='80%' _active={{transform: 'scale(0.85)'}} onClick={() => setTimeout(() => {push(path.join(__dirname, './graphs'))}, 100)}>Dashboard</Button>

          <Spacer />

          {/* Edit Cluster Button */}
          <IconButton aria-label='edit cluster' variant='ghost' onClick={() => handleEditClusterOpen(clusterObj)} icon={<EditIcon boxSize={5} />} />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default ClusterCard;