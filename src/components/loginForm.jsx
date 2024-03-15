import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
// import { auth, signIn } from '../../NextAuth/auth.js';
import { 
    Input,
    Box,
    Heading,
    Flex,
    Image,
    Button,
    InputGroup,
    Stack,
    Link,
    Text,
    InputLeftElement,
    chakra,
    FormControl,
    FormHelperText,
    InputRightElement,
  } from '@chakra-ui/react';
  import { FaUserAlt, FaLock } from "react-icons/fa";


const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Function to toggle password visibility
  const handleShowClick = () => setShowPassword(!showPassword);
  
  //handles click of submit and calls handleLogin
  const handleSubmit = async (e) => {
    e.preventDefault();
    // await signIn();
    handleLogin();
  };
  
  const { username, password } = formData;

  const handleLogin = async () => {
    console.log('username: ', username);
    console.log('password: ', password);
    try {
      // Send a POST request to the backend endpoint '/auth/login' 
      const response = await axios.post(
        'http://localhost:3001/auth/login', 
        { username, password },
        {withCredentials: true}
      ); // Convert data to JSON format and send it in the request body
      console.log('response: ', response.data);

      // Parse the response data as JSON
      // const data = await response.json();

      // If the response is successful (status code 2xx), navigate to the clusters page
      if (response.status === 200) {
        console.log('successful login')
        router.replace('/clusters');
      } else {
        // If there's an error response, log the error message to the console
        // console.error(data.error);
        router.push('/signup');
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.log('Error:', error);
      router.push('/signup');
    }
  };

  const handleSignup = () => {
    router.push('/signup');
  }

  return (
    // Form component to handle form submission
    <FormControl>
      <form onSubmit={handleSubmit}>
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
              <InputLeftElement pointerEvents="none" children={<FaUserAlt color="gray.300" />}/>
              <Input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
            </InputGroup>
          </FormControl>
          {/* Password input field */}
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />}/>
              <Input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}>{showPassword ? "Hide" : "Show"}</Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {errorMessage && <FormHelperText color="red.500">{errorMessage}</FormHelperText>}
          <FormControl>
            <Button borderRadius="9px" type="submit" variant="solid" colorScheme="telegram" width="full">Login</Button>
          </FormControl>
          {/* Link to navigate to the signup page */}
          <Box mt={4} textAlign='center'>
            New to us?{' '}
            <Link color="brand.bg" onClick={handleSignup}>
              Sign Up
            </Link>
          </Box>
        </Stack>
      </form>
    </FormControl>
  );
};

export default LoginForm;