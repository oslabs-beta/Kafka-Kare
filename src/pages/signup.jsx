import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Heading,
  Box,
  Link,
  FormControl,
} from "@chakra-ui/react";
import SignupForm from '../components/signupForm.jsx'; // Import the SignupForm component


const Signup = () => {
  const router = useRouter();


  return (
    // Flex container to center the content vertically and horizontally
    <Flex className='signup-content' flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
      {/* Render the SignupForm component */}
      <Box minW={{ base: "90%", md: "468px" }} >
        <SignupForm/> {/* Pass the handleSignup function and errorMessage as props */}
      </Box>
    </Flex>
  );
};

export default Signup;