import React from 'react';
import { useColorMode, Button } from '@chakra-ui/react';

const ColorMode = () => {

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <header>
            <Button onClick={toggleColorMode}>
                Color Mode: {colorMode === 'light' ? 'dark' : 'light'}
            </Button>
        </header>
    )
}

export default ColorMode;