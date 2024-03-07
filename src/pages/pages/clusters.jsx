'use client'

import React, { useState } from 'react';
import {
  Box, Flex, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Text, Button, Spacer, Heading, Stack, StackDivider, Link, Code,
  Input, InputGroup, InputLeftElement, InputRightElement, IconButton, Image,
  FormControl, FormLabel, FormErrorMessage,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Search2Icon, AddIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import path from 'path';

export default function Home() {
  const { push } = useRouter();
  const [ isNewClusterOpen, setIsNewClusterOpen ] = useState();
  const handleNewClusterClose = () => {
    setClusterName('');
    setClusterPort('');
    setIsClusterNameEmpty(false);
    setIsClusterPortEmpty(false);
    setIsNewClusterOpen(false);
  }
  const [ clusterArray, setClusterArray ] = useState([]);
  const [ clusterDisplayArray, setClusterDisplayArray ] = useState([]);
  const handleNewCluster = () => {
    if (clusterName === '') setIsClusterNameEmpty(true);
    if (clusterPort === '') setIsClusterPortEmpty(true);
    if (clusterName !== '' && clusterPort !== '') {
      setClusterArray(clusterArray.concat([{name: clusterName, port: clusterPort}]));
      setClusterDisplayArray(clusterArray.concat([{name: clusterName, port: clusterPort}]));
      setClusterName('');
      setClusterPort('');
      setIsClusterNameEmpty(false);
      setIsClusterPortEmpty(false);
      setIsNewClusterOpen(false);
    }
  };
  const [ deletedClusterObj, setDeletedClusterObj ] = useState({});
  const [ isDeleteClusterOpen, setIsDeleteClusterOpen ] = useState(false);
  const handleDeleteClusterClose = () => {
    setIsDeleteClusterOpen(false);
  }
  const handleDeleteCluster = (deletedClusterObj) => {
    for (const [index, clusterObj] of clusterDisplayArray.entries()) {
      if (clusterObj.name === deletedClusterObj.name && clusterObj.port === deletedClusterObj.port) {
        setClusterDisplayArray(clusterDisplayArray.toSpliced(index, 1));
        break;
      }
    }
    for (const [index, clusterObj] of clusterArray.entries()) {
      if (clusterObj.name === deletedClusterObj.name && clusterObj.port === deletedClusterObj.port) {
        setClusterArray(clusterArray.toSpliced(index, 1));
        break;
      }
    }
    setIsDeleteClusterOpen(false);
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
      if (clusterObj.name.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1 || clusterObj.port.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1) {
        newClusterDisplayArray.push(clusterObj);
      }
    });
    setClusterDisplayArray(newClusterDisplayArray);
  }
  const [ isDrawerOpen, setIsDrawerOpen ] = useState('');
  const drawerBtnRef = React.useRef();
  const slackWebhookSteps = [
    { title: 'First', description: () => (
      <>
        Go to <b><Link href='https://api.slack.com/apps?new_app=1' color='teal.500' isExternal>
          Create your Slack App
        </Link></b> and pick a <b>name</b>, choose a <b>workspace</b> to associate your app with, then click <b>Create App</b> button.
      </>
    )},
    { title: 'Second', description: () => (
      <>
        You should be redirect to <b><Link href='https://api.slack.com/apps' color='teal.500' isExternal>
          App Management Dashboard
        </Link></b>. From here, select <b>Incoming Webhooks</b> at the left under Features, and toggle <b>Activate Incoming Webhooks</b> to on.
      </>
    )},
    { title: 'Third', description: () => (
      <>
        Now that incoming webhooks are enabled, the settings page should refresh and some additional options will appear. Click the <b>Add New Webhook to Workspace</b> button at the bottom.
      </>
    )},
    { title: 'Fourth', description: () => (
      <>
        Pick a <b>channel</b> that the app will post to, then select <b>Authorize</b>. If you need to add the incoming webhook to a private channel, you must first be in that channel. You'll be sent back to <b><Link href='https://api.slack.com/apps' color='teal.500' isExternal>
          App Management Dashboard
        </Link></b>, where you should see your webhook URL, which will look something like this:
        <Code>https://hooks.slack.com/services/T00000000/B00000000/</Code><Code>XXXXXXXXXXXXXXXXXXXXXXXX</Code>
      </>
    )},
  ];

  const testing = () => {
    // window.location.href = path.join(__dirname, './pages/404');
    push(path.join(__dirname, './pages/404'));
  };
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
        <Modal isOpen={isNewClusterOpen} onClose={ handleNewClusterClose }>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Cluster</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired isInvalid = { isClusterNameEmpty } mb={8}>
                <FormLabel fontWeight = "bold">Name: { clusterName }</FormLabel>
                <Input
                  isRequired
                  value = { clusterName }
                  onChange = { handleClusterNameChange }
                  placeholder = 'Cluster #'
                  size = 'md'
                />
                <FormErrorMessage><b>Cluster name</b>&nbsp;shouldn't be Empty</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid = { isClusterPortEmpty } mb={8}>
                <FormLabel fontWeight = "bold" mb='0.5rem'>Hostname & Port: { clusterPort }</FormLabel>
                <Input
                  isRequired
                  value = { clusterPort }
                  onChange = { handleClusterPortChange }
                  placeholder = 'localhost: #'
                  size = 'md'
                />
                <FormErrorMessage><b>Cluster port</b>&nbsp;shouldn't be Empty</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={ handleNewClusterClose }>Cancel</Button>
              <Button colorScheme='blue' onClick={ handleNewCluster }>Submit</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Spacer />
        <IconButton aria-label='open drawer' icon={<HamburgerIcon onClick={() => setIsDrawerOpen(true)}/>} />
        <Drawer placement='right' size='md' onClose={() => setIsDrawerOpen(false)} isOpen={isDrawerOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Menu</DrawerHeader>
            <DrawerBody mb={2}>
              <FormLabel >Slack Webhook URL</FormLabel>
              <Input placeholder='https://hooks.slack.com/services/T... /B... /...' />
              <FormLabel mt={8} >Get Slack Webhook URL through steps below:</FormLabel>
              <Stepper orientation='vertical' height='75%' gap='1'>
                {slackWebhookSteps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink=''>
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>
                        {step.description()}
                      </StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
              {/* <Button w='100%' onClick={async () => {
                const rawResponse = await fetch('https://hooks.slack.com/services/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', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  body: JSON.stringify({"text":"Testing sending message to channel"})
                });
                const content = await rawResponse.text();
                console.log(content);
              }}>Dashboard</Button> */}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
      <Box width="full" justifyContent="center" p={8} style={{height: 'calc(100% - 90px)'}} overflowY="scroll">
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
          {clusterDisplayArray.map((clusterObj, index) => (
            <Card id={'cluster' + index} >
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
                      {clusterObj.port}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Hostname & Port
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {clusterObj.port}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
              <CardFooter>
              <Button w='100%' onClick={ () => push(path.join(__dirname, './pages/graphs')) }>Dashboard</Button>
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