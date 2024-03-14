import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { auth, signIn } from '../../NextAuth/auth.js';
import axios from 'axios'; // Import axios for making HTTP requests
import {
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Image,
  Button,
  FormHelperText,
  chakra,
  Box,
  Link,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";


const SignupForm = ({ onSubmit }) => {
  // const session = await auth();
  const [username, setUsername] = useState(''); // State to store username
  const [password, setPassword] = useState(''); // State to store password
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message
  const router = useRouter();
  // Function to toggle password visibility
  const handleShowClick = () => setShowPassword(!showPassword);

  // Function to handle form submission
  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Validate input fields
    if (!username || !password) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/auth/signup', {
        username, password
      });
      
      console.log('response: ', response.data);

      if (response.data.message) {
        console.log('signup successful!');
        router.replace('/clusters')
      } else {
        setErrorMessage('Signup Failed');
      }
    } catch (error) {
      console.error('error: ', error);
      if (error.response.data.err === 'username already exists in database') {
        setErrorMessage('Please choose a different username')
      } else setErrorMessage('An error occurred during signup.')
    }
  };
  
  // Function to handle navigation to the login page
  const handleLogin = () => {
    router.push('/login'); // Navigate to the login page when clicked
  };

  return (
    // Form component to handle form submission
    <FormControl>
      <form onSubmit={handleSignUp}>
        <Stack spacing={8} px="4.5rem" backgroundColor="whiteAlpha.900" boxShadow="xl" minH='400px' maxH='550px' h="65vh" borderRadius="10px" justifyContent='center'>
          {/* Logo and heading */}
          <Box mb={6} display='flex' justifyContent='center'>
            <Image w={260} src='kafka-kare-logo-v3.png' />
            {/* <Heading size='2xl' color="brand.text" mb={2} textAlign='center'>Kafka Kare</Heading>
            <Text fontFamily='-apple-system, BlinkMacSystemFont' fontSize='lg' textAlign='center'>Becuase we Kare.</Text> */}
          </Box>
          {/* Username input field */}
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaUserAlt color="gray.300" />} />
              <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </InputGroup>
          </FormControl>
          {/* Password input field */}
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
              <Input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {/* Display error message if any */}
          {errorMessage && <FormHelperText color="red.500">{errorMessage}</FormHelperText>}
          {/* Submit button */}
          <FormControl>
            <Button borderRadius="9px" type="submit" variant="solid" colorScheme="telegram" width="full">Sign Up</Button>
          </FormControl>
          {/* Link to navigate to the login page */}
          <Box mt={4} textAlign='center'>
            Welcome!{' '}
            <Link color="brand.bg" onClick={handleLogin}>Login</Link>
          </Box>
        </Stack>
      </form>
    </FormControl>
  );
};

export default SignupForm;