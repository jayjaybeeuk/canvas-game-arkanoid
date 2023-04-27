import { ReactElement } from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const Footer = (): ReactElement => (
  <Box
    bg={useColorModeValue('gray.50', 'gray.900')}
    color={useColorModeValue('gray.700', 'gray.200')}
    width={'100%'}
  >
    <Container
      as={Stack}
      maxW={'6xl'}
      py={4}
      direction={{ base: 'column', md: 'row' }}
      spacing={4}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'center' }}
    >
      <Text>&nbsp;</Text>
      <Stack direction={'row'} spacing={6}>
        <Text>© 2022 Footer</Text>
      </Stack>
    </Container>
  </Box>
);

export { Footer };
