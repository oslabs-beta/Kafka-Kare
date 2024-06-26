'use client';

import React from 'react';
import {
  Flex,
  Box,
  useColorModeValue
} from "@chakra-ui/react";
import LoginForm from '../../components/login/loginForm'; // Import the LoginForm component

const Login = () => {

  // states for properties in different color mode
  const loginBGImage = useColorModeValue('/kafka-kare-background-v2.jpg', '/kafka-kare-meerkat-background-v2.png');
  const loginBGSize = useColorModeValue(200, 100);

  return (
    // Flex container to center the content vertically and horizontally
    <Flex
      className='login-content' backgroundImage={loginBGImage} backgroundSize={loginBGSize}  flexDirection="column"
      width="100wh" height="100vh" backgroundColor="gray.700" justifyContent="center" alignItems="center"
    >
      {/* Render the LoginForm component */}
      <Box minW={{ base: "90%", md: "468px" }} >
        <LoginForm />
      </Box>
    </Flex>
  );
};

export default Login;