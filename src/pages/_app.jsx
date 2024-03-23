import React from 'react';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme.js';
import { SessionProvider } from 'next-auth/react';


const App = ({ Component, pageProps }) => {
  return(
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
          <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )};

export default App;
