import React, { useEffect, useState } from 'react';
import {
  Flex, Heading, Spacer, IconButton, Stack, StackDivider, Box, Text, Button, Icon, useToast, Badge,
  Card, CardHeader, CardBody, CardFooter,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { RxStar, RxStarFilled } from 'react-icons/rx';
import { AiFillAlert, AiTwotoneAlert, AiOutlineAlert } from "react-icons/ai";
import path from 'path';
import { handleEditClusterOpen, handleDeleteClusterOpen, handleFavoriteChange } from '../../../utils/clustersHandler';
import Link from 'next/link'

const ClusterCard = ({ clusterObj }) => {
  
  // declare variable to use toast and push
  const { push } = useRouter();
  const toast = useToast();
  const [redExist, setRedExist] = useState('green');
  useEffect(() => {
    if (clusterObj.alertTopics.length < 1) setRedExist('green');
    else if (
      clusterObj.alertTopics.reduce((includeRed, alertTopic) => includeRed || alertTopic.color === 'red', false)
    ) setRedExist('red');
    else setRedExist('orange');
  }, [clusterObj]);

  return (

    /* Cluster Card */
    <Card boxShadow='lg'>
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
            _hover={''} isRound={true} aria-label='delete cluster' mr={1} icon={<CloseIcon color='gray.500' boxSize={3} />}
            onClick = {() => handleDeleteClusterOpen(clusterObj)} variant='ghost'
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={3}>

          {/* Hostname and Port */}
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Hostname & Port
            </Heading>
            <Text pt='2' fontSize='sm'>
              {clusterObj.hostnameAndPort}
            </Text>
          </Box>

          {/* Number of Brokers */}
          <Box>
            <Heading size='xs' textTransform='uppercase'>
             Number of Brokers
            </Heading>
            <Text pt='2' fontSize='sm'>
              {clusterObj.numberOfBrokers}
            </Text>
          </Box>

          {/* Alert Brief */}
          <Box>
            <Heading size='xs' textTransform='uppercase' pb={2}>
              Alert Brief
            </Heading>
            <Flex w='full' justifyContent='center' alignItems='center'>
              <Box maxH={12} overflow={'hidden'}>
                {
                  clusterObj.alertTopics.length > 0
                  ? clusterObj.alertTopics.map((alertTopic, index) => {
                    return <Badge key={'alertBadge'+index} colorScheme={alertTopic.color} mx={0.5}>{alertTopic.text}</Badge>
                  }).filter((el, index) => index < 4).concat([<Badge key={'alertBadge'+'...'} colorScheme='white' mx={0}>...</Badge>])
                  : [<Badge key={'alertBadge'+'No'} colorScheme='green' mx={1}>no_alert</Badge>]
                }
              </Box>
              <Spacer />

              {/* Alert Button */}
              <Link href="/alerts">
                <IconButton
                  aria-label='redirect to alert' variant='ghost' 
                  icon={<Icon as={AiFillAlert} color={redExist} boxSize={6} />}
                />
              </Link>
            </Flex>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter>
        <Flex width='full'>

          {/* Graphs Button */}
          <Button w='80%' _active={{transform: 'scale(0.85)'}} onClick={() => setTimeout(() => {push('/dashboard')}, 100)}>Dashboard</Button>

          <Spacer />

          {/* Edit Cluster Button */}
          <IconButton aria-label='edit cluster' variant='ghost' onClick={() => handleEditClusterOpen(clusterObj)} icon={<EditIcon boxSize={5} />} />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default ClusterCard;