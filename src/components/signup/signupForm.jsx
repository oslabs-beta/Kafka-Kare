'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
// import { auth, signIn } from '../../NextAuth/auth.js';
import { FcGoogle } from "react-icons/fc";
import {
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Image,
  Button,
  FormErrorMessage,
  chakra,
  Box,
  Link,
  useToast,
  useColorModeValue,
  Divider,
  AbsoluteCenter
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { userStore } from '../../store/user';
import { handleSignUp } from '../../utils/userHandler'; 

const SignupForm = () => {
  // const session = await auth();
  const username = userStore(state => state.username); // State to store username
  const password = userStore(state => state.password); // State to store password
  const showPassword = userStore(state => state.showPassword); // State to toggle password visibility
  const usernameInvalid = userStore(state => state.usernameInvalid); // State to manage password validity
  const usernameErrorMessage = userStore(state => state.usernameErrorMessage); // State to store username error message
  const passwordInvalid = userStore(state => state.passwordInvalid); // State to manage username validity
  const passwordErrorMessage = userStore(state => state.passwordErrorMessage); // State to store password error message
  const resetUserStore = userStore(state => state.reset);
  const signupFormBGColor = useColorModeValue('whiteAlpha.900', 'gray.600');
  const router = useRouter();
  const toast = useToast();
  const initialRef = useRef();
  useEffect(() => {
    resetUserStore();
    initialRef.current.focus();
  }, []);
  // Function to toggle password visibility
  const handleShowClick = () => userStore.setState({showPassword: !showPassword});
  
  // Function to handle navigation to the login page
  const handleLogin = () => {
    router.push('/login'); // Navigate to the login page when clicked
  };

  return (
    // Form component to handle form submission
    <FormControl>
      <form onSubmit={(e) => handleSignUp(e, toast, router)}>
        <Stack spacing={8} px="4.5rem" backgroundColor={signupFormBGColor} boxShadow="xl" minH='550px' maxH='650px' h="70vh"  borderRadius="10px" justifyContent='center'>
          {/* Logo and heading */}
          <Box mb={6} display='flex' justifyContent='center'>
            <Image w={260} src='kafka-kare-logo-v3-dark.png' />
            {/* <Heading size='2xl' color="brand.text" mb={2} textAlign='center'>Kafka Kare</Heading>
            <Text fontFamily='-apple-system, BlinkMacSystemFont' fontSize='lg' textAlign='center'>Becuase we Kare.</Text> */}
          </Box>
          {/* Username input field */}
          <FormControl isInvalid={usernameInvalid}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaUserAlt color="gray.300" />} />
              <Input
                type="text" placeholder="Username" value={username} onChange={(e) => {userStore.setState({username: e.target.value.trim()})}}
                onFocus={() => {userStore.setState({usernameErrorMessage: ''}); userStore.setState({usernameInvalid: false});}} ref={initialRef}
                />
            </InputGroup>
            {/* Display error message if any */}
            <FormErrorMessage>{usernameErrorMessage}</FormErrorMessage>
          </FormControl>
          {/* Password input field */}
          <FormControl isInvalid={passwordInvalid}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
              <Input
                type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => {userStore.setState({password: e.target.value.trim()})}}
                onFocus={() => {userStore.setState({passwordErrorMessage: ''}); userStore.setState({passwordInvalid: false});}}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {/* Display error message if any */}
            <FormErrorMessage>{passwordErrorMessage}</FormErrorMessage>
          </FormControl>
          {/* Submit button */}
          <FormControl>
            <Button borderRadius="9px" type="submit" variant="solid" colorScheme="telegram" width="full">Sign Up</Button>
          </FormControl>
          <Box position='relative' width='full' p={2} h={2}>
            <Divider />
            <AbsoluteCenter backgroundColor={signupFormBGColor} px={4}>
              or
            </AbsoluteCenter>
          </Box>
          <Button leftIcon={<FcGoogle size={20} />} borderRadius="9px" variant="outline" width="full" onClick={() => signIn('google')}>Continue with Google</Button>
          {/* Link to navigate to the login page */}
          <Box mt={-2} textAlign='center'>
            Welcome!{' '}
            <Link color="brand.bg" onClick={handleLogin}>Login</Link>
          </Box>
        </Stack>
      </form>
    </FormControl>
  );
};

export default SignupForm;