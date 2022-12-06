import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { GamePage } from '../modules/game-page';
import { MainMenu } from '../components/main-menu';
import { GAME_TEST, GAME_ARKANOID_WEEK_ONE } from '../constants';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <MainMenu />
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
  );
}

export default App;
