'use client';

import React from 'react';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme.js';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </SessionProvider>
  )
};