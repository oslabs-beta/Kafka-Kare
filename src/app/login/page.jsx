import React from 'react';
import {
  Flex,
  Box,
} from "@chakra-ui/react";
import LoginForm from '../../components/login/loginForm'; // Import the LoginForm component

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
};

export default Login;