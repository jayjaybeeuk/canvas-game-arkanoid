import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Box, Tabs, TabList, Tab } from '@chakra-ui/react';

const MainMenu = (): ReactElement => (
  <Box role="navigation" width={'100%'}>
    <Tabs>
      <TabList>
        <Tab>
          <Link to="/">Test</Link>
        </Tab>
        <Tab>
          <Link to="/arkanoid-week-1">Arkanoid Week 1</Link>
        </Tab>
      </TabList>
    </Tabs>
  </Box>
);

export { MainMenu };
