import React from 'react';
import { Arkanoid } from './arkanoid';

describe('arkanoidWeekOne', () => {
  it('should work', () => {
    expect(<Arkanoid title={''} />).toEqual('arkanoid-part-one');
  });
});
