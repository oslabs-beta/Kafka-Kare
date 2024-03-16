import React from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../components/loginForm.jsx'
import {
    Flex,
    Heading,
    Box,
    Stack,
    Link,
  } from "@chakra-ui/react";

const Login = () => {

  return (
    // Flex container to center the content vertically and horizontally
    <Flex className='login-content' flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
      {/* Render the LoginForm component */}
      <Box minW={{ base: "90%", md: "468px" }} >
        <LoginForm />
      </Box>
    </Flex>
  );
}

  export default Login;