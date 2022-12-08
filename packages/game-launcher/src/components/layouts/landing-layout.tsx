import React, { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import { MainMenu } from '../main-menu';
import { Footer } from '../footer';

type LandingLayout = {
  children: ReactNode;
};
export default function LandingLayout(props: LandingLayout) {
  const { children, ...rest } = props;
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: '1200px' }}
      m="0 auto"
      {...rest}
    >
      <MainMenu />
      {children}
      <Footer />
    </Flex>
  );
}

export { LandingLayout };
