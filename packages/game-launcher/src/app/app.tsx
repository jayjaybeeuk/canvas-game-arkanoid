import styled from 'styled-components';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { GamePage } from '../pages/game-page';

import { GAME_TEST, GAME_ARKANOID_WEEK_ONE } from '../constants';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <ChakraProvider>
      <StyledApp>
        <Routes>
          <Route
            path="/"
            element={<GamePage title="Circle Test" gameType={GAME_TEST} />}
          />
          <Route
            path="/arkanoid-week-1"
            element={
              <GamePage title="Arkanoid" gameType={GAME_ARKANOID_WEEK_ONE} />
            }
          />
        </Routes>
      </StyledApp>
    </ChakraProvider>
  );
}

export default App;
