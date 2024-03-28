import React from 'react';
import { Input, InputGroup, InputLeftElement, InputRightElement, IconButton } from '@chakra-ui/react';
import { Search2Icon, CloseIcon } from '@chakra-ui/icons';
import { clustersStore } from '../../../store/clusters';
import { handleClusterSearchValueChange } from '../../../utils/clustersHandler';

const SearchInput = () => {
  const clusterSearchValue = clustersStore(state => state.clusterSearchValue);

  return (
    
    /* Search input */
    <InputGroup w={['18%', '18%', '28%', '44%', '58%', '66%']}>
      <InputLeftElement pointerEvents='none'>
        <Search2Icon />
      </InputLeftElement>
      <Input
        type='tel' placeholder={'Name or Port'} value={clusterSearchValue}
        onChange={(event) => handleClusterSearchValueChange(event.target.value)}
      />
      <InputRightElement>
      <IconButton
        _hover={''} isRound={true} aria-label='clean cluster search' size='xs' icon={<CloseIcon color='gray.500' />}
        variant='ghost' onClick = {() => handleClusterSearchValueChange('')}
      />
      </InputRightElement>
    </InputGroup>
  )
}

export default SearchInput;