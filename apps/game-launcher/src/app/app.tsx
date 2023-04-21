import styled from 'styled-components';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { GamePage } from '../pages/game-page';

import {
  GAME_TEST,
  GAME_ARKANOID_PART_ONE,
  GAME_ARKANOID_PART_TWO,
  GAME_ARKANOID_PART_THREE,
  GAME_ARKANOID_PART_FOUR,
} from '../constants';

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
            path="/arkanoid-part-1"
            element={
              <GamePage title="Arkanoid" gameType={GAME_ARKANOID_PART_ONE} />
            }
          />
          <Route
            path="/arkanoid-part-2"
            element={
              <GamePage title="Arkanoid" gameType={GAME_ARKANOID_PART_TWO} />
            }
          />
          <Route
            path="/arkanoid-part-3"
            element={
              <GamePage title="Arkanoid" gameType={GAME_ARKANOID_PART_THREE} />
            }
          />
          <Route
            path="/arkanoid-part-4"
            element={
              <GamePage title="Arkanoid" gameType={GAME_ARKANOID_PART_FOUR} />
            }
          />
        </Routes>
      </StyledApp>
    </ChakraProvider>
  );
}

export default App;
