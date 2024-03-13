import React from 'react';
import {
  FormLabel, Box, Link, Code, Textarea, Flex, Icon, IconButton,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper
} from '@chakra-ui/react';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { clustersStore } from '../../store/clusters';

const MenuDrawer = ({ handleSlackWebhookURLSubmit }) => {

  // declare state variables
  const isDrawerOpen = clustersStore(state => state.isDrawerOpen);
  const slackWebhookURL = clustersStore(state => state.slackWebhookURL);

  // declare reference modal initial focus
  const initialRef = React.useRef(null);

  // check slack url format before submit
  const submitSlackWebhookUrl = () => {
    if (slackWebhookURL.slice(0, 34) === 'https://hooks.slack.com/services/T'
      && slackWebhookURL.indexOf('/B') - slackWebhookURL.indexOf('/T') >= 10
      && slackWebhookURL.lastIndexOf('/') - slackWebhookURL.indexOf('/B') >= 9
      && slackWebhookURL.length >= 77
    ) {
      alert('Right Format');
      handleSlackWebhookURLSubmit();
    } else {
      alert('Wrong Format');
    }
  }

  // declare slack webhook step array
  // { title: (String), description: (Function that returns JSX)}
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
        Pick a <b>channel</b> that the app will post to, then select <b>Authorize</b>. If you need to add the incoming webhook to a private channel, you must first be in that channel. You'll be sent back to&nbsp;
        <b><Link href='https://api.slack.com/apps' color='teal.500' isExternal>
          App Management Dashboard
        </Link></b>, where you should see your webhook URL, which will look something like this:
        <Code>https://hooks.slack.com/services/T00000000/B00000000/</Code><Code>XXXXXXXXXXXXXXXXXXXXXXXX</Code>
      </>
    )},
  ];

  return (

    /* Menu Drawer */
    <Drawer placement='right' size='md' onClose={() => clustersStore.setState({isDrawerOpen: false})} isOpen={isDrawerOpen} initialFocusRef={initialRef}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        {/* Title */}
        <DrawerHeader borderBottomWidth='1px'>Menu</DrawerHeader>

        {/* Content */}
        <DrawerBody mb={2} overflowY='hidden'>

          {/* URL Subtitle */}
          <FormLabel >Slack Webhook URL</FormLabel>

          <Flex width='full'>

            {/* URL Input */}
            <Textarea
              placeholder='https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX' resize='none' ref={initialRef}
              onChange={(e) => {clustersStore.setState({slackWebhookURL: e.target.value})}} value={slackWebhookURL}
            />

            {/* Submit URL Input */}
            <IconButton
              aria-label='submit slack url' h={20} colorScheme='twitter' ml={2}
              icon={<Icon as={RiSendPlane2Fill} boxSize={6} />} onClick = {() => {submitSlackWebhookUrl()}}
            />
          </Flex>

          {/* Step Subtitle */}
          <FormLabel mt={4} >Get Slack Webhook URL through steps below:</FormLabel>

          {/* Slack Webhook Step */}
          <Stepper orientation='vertical' height='75%' gap='1' overflowY='auto'>
            {slackWebhookSteps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                </StepIndicator>
                <Box flexShrink=''>
                  <StepTitle mb={1}>{step.title}</StepTitle>
                  <StepDescription mb={2}>
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
              body: JSON.stringify({'text':'Testing sending message to channel'})
            });
            const content = await rawResponse.text();
            console.log(content);
          }}>Dashboard</Button> */}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuDrawer;