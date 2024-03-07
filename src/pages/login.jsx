import React from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../components/loginForm.jsx'
import {
    Flex,
    Heading,
    Avatar,
    Box,
    Stack,
    Link,
  } from "@chakra-ui/react";

const Login = () => {
    const router = useRouter();
    
    const handleSignup = () => {
        router.push('/signup');
    }

    return (
        // Flex container to center the content vertically and horizontally
        <Flex flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
          <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
            {/* Logo and heading */}
            <Heading color="brand.text">Kafka Kare</Heading>
            {/* Render the LoginForm component */}
            <Box minW={{ base: "90%", md: "468px" }} >
              <LoginForm />
            </Box>
          </Stack>
          {/* Link to navigate to the signup page */}
          <Box mt={4}>
            New to us?{' '}
            <Link color="brand.bg" onClick={handleSignup}>
              Sign Up
            </Link>
          </Box>
        </Flex>
      );
  }

  export default Login;