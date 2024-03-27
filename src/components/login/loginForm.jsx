'use client';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { 
  Input,
  Box,
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
  FormErrorMessage,
  InputRightElement,
  useToast,
  Divider,
  AbsoluteCenter,
  useColorModeValue,
 } from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { userStore } from '../../store/user';
import { handleLogin, handleLoggedInOAuth } from '../../utils/userHandler';


const LoginForm = () => {
  const username = userStore(state => state.username); // State to store username
  const password = userStore(state => state.password); // State to store password
  const showPassword = userStore(state => state.showPassword); // State to toggle password visibility
  const usernameInvalid = userStore(state => state.usernameInvalid); // State to manage password validity
  const usernameErrorMessage = userStore(state => state.usernameErrorMessage); // State to store username error message
  const passwordInvalid = userStore(state => state.passwordInvalid); // State to manage username validity
  const passwordErrorMessage = userStore(state => state.passwordErrorMessage); // State to store password error message
  const resetUserStore = userStore(state => state.reset); // State to reset the whole store
  const loginFormBGColor = useColorModeValue('whiteAlpha.900', 'gray.600'); // State manage properties in different color mode
  const router = useRouter(); // Hook to change endpoint
  const toast = useToast(); // Hook to use toast
  const initialRef = useRef(null); // Reference to focus when modal opened
  const { data: session, status } = useSession(); // State for nextAuth
  useEffect(() => {
    resetUserStore();
    initialRef.current.focus();
  }, []);
  // Function to toggle password visibility
  const handleShowClick = () => userStore.setState({showPassword: !showPassword});
  // Function to handle navigation to the login page
  const handleSignup = () => {
    router.push('/signup'); // Navigate to the sign-up page when clicked
  }

  // If user logged in using nextAuth, check and redirect to clusters page
  if (session) {
    console.log(session);
    handleLoggedInOAuth(session, router, toast);
  }
  return (
    // Form component to handle form submission
    <FormControl>
      <form onSubmit={(e) => handleLogin(e, toast, router)}>
        <Stack spacing={6} px="4.5rem" backgroundColor={loginFormBGColor} boxShadow="xl" minH='550px' maxH='650px' h="70vh" borderRadius="10px" justifyContent='center'>
          {/* Logo and heading */}
          <Box mb={5} display='flex' justifyContent='center'>
            <Image w={260} src='kafka-kare-logo-v3-dark.png' />
            {/* <Heading size='2xl' color="brand.text" mb={2} textAlign='center'>Kafka Kare</Heading>
            <Text fontFamily='-apple-system, BlinkMacSystemFont' fontSize='lg' textAlign='center'>Becuase we Kare.</Text> */}
          </Box>
          {/* Username input field */}
          <FormControl isInvalid={usernameInvalid}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaUserAlt color="gray.300" />}/>
              <Input 
                type="text" name="username" value={username} placeholder="Username" onChange={(e) => {userStore.setState({username: e.target.value.trim()})}}
                onFocus={() => {userStore.setState({usernameErrorMessage: ''}); userStore.setState({usernameInvalid: false});}} ref={initialRef}
              />
            </InputGroup>
            {/* Display error message if any */}
            <FormErrorMessage>{usernameErrorMessage}</FormErrorMessage>
          </FormControl>
          {/* Password input field */}
          <FormControl isInvalid={passwordInvalid}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />}/>
              <Input
                type={showPassword ? "text" : "password"} name="password" value={password} placeholder="Password" onChange={(e) => {userStore.setState({password: e.target.value.trim()})}}
                onFocus={() => {userStore.setState({passwordErrorMessage: ''}); userStore.setState({passwordInvalid: false});}}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}>{showPassword ? "Hide" : "Show"}</Button>
              </InputRightElement>
            </InputGroup>
            {/* Display error message if any */}
            <FormErrorMessage>{passwordErrorMessage}</FormErrorMessage>
          </FormControl>
          {/* Submit button */}
          <FormControl>
            <Button borderRadius="9px" type="submit" variant="solid" colorScheme="telegram" width="full">Login</Button>
          </FormControl>
          <Box position='relative' width='full' p={2} h={2}>
            <Divider />
            <AbsoluteCenter backgroundColor={loginFormBGColor} px={4}>
              or
            </AbsoluteCenter>
          </Box>
          <Button leftIcon={<FcGoogle size={20} />} borderRadius="9px" variant="outline" width="full" onClick={() => signIn('google')}>Continue with Google</Button>
          <Button leftIcon={<FaGithub size={20} />} borderRadius="9px" variant="outline" width="full" onClick={() => signIn('github')}>Continue with Github</Button>
          {/* Link to navigate to the signup page */}
          <Box textAlign='center'>
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