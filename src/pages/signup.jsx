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

  // Function to handle signup form submission
  const handleSignup = async ({ username, password }) => {
    try {
      // Send a POST request to the backend endpoint '/signup'
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Convert data to JSON format and send it in the request body
      });

      // Parse the response data as JSON
      const data = await response.json();

      // If the response is successful (status code 2xx), navigate to the map page
      if (response.ok) {
        router.replace('/clusters');
      } else {
        // If there's an error response, set the error message
        setErrorMessage(data.message); // Assuming the backend returns the error message in a 'message' field
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error('Error:', error);
      setErrorMessage('An error occurred during signup.');
    }
  };

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
        <SignupForm onSubmit={handleSignup} errorMessage={errorMessage} /> {/* Pass the handleSignup function and errorMessage as props */}
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