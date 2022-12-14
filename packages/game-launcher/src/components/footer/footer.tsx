import { ReactElement } from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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
      <Stack direction={'row'} spacing={6}>
        <Link to="/">Test</Link>
        <Link to="/arkanoid-week-1">Arkanoid Week 1</Link>
      </Stack>
      <Text>© 2022 Footer</Text>
    </Container>
  </Box>
);

export { Footer };
