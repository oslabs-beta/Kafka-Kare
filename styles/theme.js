import { extendTheme } from '@chakra-ui/react';
// import { BackgroundGradientAnimation, Menu, MenuItem } from '../src/ui/*';

//if we want to use Chakra UI
const theme = extendTheme({
  styles: {
    global: {
        '.background-gradient-animation': {
            backgroundColor: 'pink'
        }
    },
  },
});

export default theme;
