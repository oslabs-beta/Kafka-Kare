import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button, Image, Text, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import BackgroundAnimation from "../ui/home-background-animation";

const Home = () => {
  

  return (
    <BackgroundAnimation>
    <Box className="absolute z-50 inset-0 flex items-center justify-center pointer-events-none"
        textAlign="center"
      >
        <Text f fontSize={{ base: "9xl", md: "20xl", lg: "20xl" }}
          fontWeight="bold"
        //   fontColor='white'
          bgGradient="linear(to-b, whiteAlpha.80, whiteAlpha.20)"
          _hover={{
            bgGradient: "linear(to-b, whiteAlpha.20, whiteAlpha.80)",
          }}
          boxShadow="2xl"
        >Kafka Kare</Text> 
        {/* <Image src='/kafka-kare-logo-v3.png' h={200} borderRadius={8} margin='20px' /> */}
        <Link href='/login' passHref>
            <Button height='40px' width='155px' margin='20px' borderRadius='30px'>Login</Button>
        </Link>
        <Link href='/signup' passHref>
            <Button height='40px' width='155px' margin='20px' borderRadius='30px'>Signup</Button>
        </Link>
    </Box>
{/* </div> */}
</BackgroundAnimation>
  );
};

export default Home;
