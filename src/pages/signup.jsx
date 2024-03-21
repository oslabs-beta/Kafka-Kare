import React from 'react';
import {
  Flex,
  Box,
} from "@chakra-ui/react";
import SignupForm from '../components/signup/signupForm.jsx'; // Import the SignupForm component

const Signup = () => {
<<<<<<< HEAD
  const router = useRouter();

=======
>>>>>>> dev

  return (
    // Flex container to center the content vertically and horizontally
    <Flex className='signup-content' flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
      {/* Render the SignupForm component */}
      <Box minW={{ base: "90%", md: "468px" }} >
        <SignupForm />
      </Box>
    </Flex>
  );
};

export default Signup;