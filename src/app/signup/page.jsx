'use client';

import React from 'react';
import {
  Flex,
  Box,
  useColorModeValue
} from "@chakra-ui/react";
import SignupForm from '../../components/signup/signupForm'; // Import the SignupForm component

const Signup = () => {

  // states for properties in different color mode
  const loginBGImage = useColorModeValue('/kafka-kare-background-v2.jpg', '/kafka-kare-meerkat-background-v2.png');
  const loginBGSize = useColorModeValue(200, 100);

  return (
    // Flex container to center the content vertically and horizontally
    <Flex
      className='signup-content' backgroundImage={loginBGImage} backgroundSize={loginBGSize} flexDirection="column"
      width="100wh" height="100vh" backgroundColor="gray.700" justifyContent="center" alignItems="center"
    >
      {/* Render the SignupForm component */}
      <Box minW={{ base: "90%", md: "468px" }} >
        <SignupForm />
      </Box>
    </Flex>
  );
};

export default Signup;