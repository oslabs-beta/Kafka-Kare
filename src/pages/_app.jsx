import React from 'react';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
// import theme from '../../styles/theme.js';



const App = ({ Component, pageProps }) => {
    return(
    <ChakraProvider>
        <Component {...pageProps} />
    </ChakraProvider>
  )};

export default App;
