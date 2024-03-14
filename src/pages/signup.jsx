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
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message


  // Function to handle navigation to the login page
  const handleLogin = () => {
    router.push('/login'); // Navigate to the login page when clicked
  };

  return (
    // Flex container to center the content vertically and horizontally
    <Flex flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
      {/* Logo and heading */}
      <Box>
        <Heading color="brand.text" mb={6}>Kafka Kare</Heading>
      </Box>
      {/* Render the SignupForm component */}
      <Box minW={{ base: "90%", md: "468px" }} >
        <SignupForm/> {/* Pass the handleSignup function and errorMessage as props */}
      </Box>
      {/* Link to navigate to the login page */}
      <Box mt={6}>
        Welcome!{' '}
        <Link color="brand.bg" onClick={handleLogin}>Login</Link>
      </Box>
    </Flex>
  );
};

export default Signup;