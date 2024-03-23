import { Box, Link as ChakraLink, VStack } from "@chakra-ui/react";
import Link from "next/link";
import AccountMenu from "../clusters/navbar/accountMenu";

const Navbar = () => {
  return (
    <Box
      position="fixed"
      left="0"
      top="0"
      bottom="0"
      width="200px"
      backgroundColor="gray.800"
      color="white"
      paddingY="4"
      paddingX="2"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <VStack spacing="6">
        <Link href="/clusters" passHref>
          <ChakraLink>Home</ChakraLink>
        </Link>
        <Link href="/dashboard" passHref>
          <ChakraLink>Dashboard</ChakraLink>
        </Link>
        <Link href="/alerts" passHref>
          <ChakraLink>Alerts</ChakraLink>
        </Link>
        <AccountMenu></AccountMenu>
      </VStack>
    </Box>
  );
};

export default Navbar;

