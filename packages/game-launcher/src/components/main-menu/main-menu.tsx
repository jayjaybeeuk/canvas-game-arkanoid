import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const MainMenu = (): ReactElement => (
  <div role="navigation">
    <ul>
      <li>
        <Link to="/">Test</Link>
      </li>
      <li>
        <Link to="/arkanoid-week-1">Arkanoid Week 1</Link>
      </li>
    </ul>
  </div>
);

export { MainMenu };
