import { extendTheme } from '@chakra-ui/react';
// import { BackgroundGradientAnimation, Menu, MenuItem } from '../src/ui/*';

//if we want to use Chakra UI
const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  }   
);

export default theme;
