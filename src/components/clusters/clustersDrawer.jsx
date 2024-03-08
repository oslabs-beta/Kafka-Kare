import React from 'react';
import {
  Input, FormLabel, Box, Link, Code, 
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper
} from '@chakra-ui/react';

const ClustersDrawer = ({isDrawerOpen, setIsDrawerOpen }) => {
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
        Pick a <b>channel</b> that the app will post to, then select <b>Authorize</b>. If you need to add the incoming webhook to a private channel, you must first be in that channel. You'll be sent back to
        <b><Link href='https://api.slack.com/apps' color='teal.500' isExternal>
          App Management Dashboard
        </Link></b>, where you should see your webhook URL, which will look something like this:
        <Code>https://hooks.slack.com/services/T00000000/B00000000/</Code><Code>XXXXXXXXXXXXXXXXXXXXXXXX</Code>
      </>
    )},
  ];

  return (
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
  );
};

export default ClustersDrawer;