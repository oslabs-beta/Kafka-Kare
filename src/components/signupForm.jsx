import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import {
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Button,
  FormHelperText,
  chakra,
  Box,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

// const CFaUserAlt = chakra(FaUserAlt);
// const CFaLock = chakra(FaLock);

const SignupForm = ({ onSubmit }) => {
  const [username, setUsername] = useState(''); // State to store username
  const [password, setPassword] = useState(''); // State to store password
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

  // Function to toggle password visibility
  const handleShowClick = () => setShowPassword(!showPassword);

  // Function to handle form submission
  const handleSignUp = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Validate input fields
    if (!username || !password) {
      setErrorMessage('All fields are required');
      return;
    }
    // Call the onSubmit function with the form data
    onSubmit({ username, password });
  };

  return (
    // Form component to handle form submission
    <form onSubmit={handleSignUp}>
      <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" borderRadius="10px">
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
              <Button borderRadius="9px" type="submit" variant="solid" colorScheme="teal" width="full">Sign Up</Button>
            </FormControl>
          </Stack>
        </form>
      );
    };

export default SignupForm;