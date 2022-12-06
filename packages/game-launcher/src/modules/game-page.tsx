import { ReactElement } from 'react';
import { Arkanoid, CircleTest } from '@canvas-game-arkanoid/arkanoid-week-one';
import { GAME_TEST, GAME_ARKANOID_WEEK_ONE } from '../constants';

type Props = {
  gameType?: string;
  title?: string;
};

const GameType = (props: Props): ReactElement => {
  const { gameType, ...rest } = props;
  switch (gameType) {
    case GAME_ARKANOID_WEEK_ONE:
      return <Arkanoid {...rest} />;
    case GAME_TEST:
      return <CircleTest {...rest} />;
    default:
      return <CircleTest {...rest} />;
  }
};

const GamePage = (props: Props): ReactElement => {
  const { title, gameType, ...rest } = props;

  return (
    <>
      {title && <h1>{title}</h1>} {<GameType gameType={gameType} {...rest} />}
    </>
  );
};

export { GamePage, GameType };
