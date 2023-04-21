import { ReactElement } from 'react';
import {
  Arkanoid as ArkanoidPartOne,
  CircleTest,
} from '@canvas-game-arkanoid/arkanoid-part-one';
import { Arkanoid as ArkanoidPartTwo } from '@canvas-game-arkanoid/arkanoid-part-two';
import { Arkanoid as ArkanoidPartThree } from '@canvas-game-arkanoid/arkanoid-part-three';
import { Arkanoid as ArkanoidPartFour } from '@canvas-game-arkanoid/arkanoid-part-four';
import {
  GAME_TEST,
  GAME_ARKANOID_PART_ONE,
  GAME_ARKANOID_PART_TWO,
  GAME_ARKANOID_PART_THREE,
  GAME_ARKANOID_PART_FOUR,
} from '../constants';
import { LandingLayout } from '../components/layouts';

type Props = {
  gameType?: string;
  title?: string;
};

const GameType = (props: Props): ReactElement => {
  const { gameType, ...rest } = props;
  switch (gameType) {
    case GAME_ARKANOID_PART_ONE:
      return <ArkanoidPartOne {...rest} />;
    case GAME_ARKANOID_PART_TWO:
      return <ArkanoidPartTwo {...rest} />;
    case GAME_ARKANOID_PART_THREE:
      return <ArkanoidPartThree {...rest} />;
    case GAME_ARKANOID_PART_FOUR:
      return <ArkanoidPartFour {...rest} />;
    case GAME_TEST:
      return <CircleTest {...rest} />;
    default:
      return <CircleTest {...rest} />;
  }
};

const GamePage = (props: Props): ReactElement => {
  const { title, gameType, ...rest } = props;
  return (
    <LandingLayout>
      {title && <h1>{title}</h1>} {<GameType gameType={gameType} {...rest} />}
    </LandingLayout>
  );
};

export { GamePage, GameType };
