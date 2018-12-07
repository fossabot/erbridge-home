import { shallow } from 'enzyme';
import React from 'react';

import { PoemWithSquare } from './dancers';

it('renders correctly', () => {
  expect(
    shallow(
      <PoemWithSquare
        normalLines={['this', 'is', 'a', 'test']}
        squareLines={['a', 'square']}
        squareStartCharacter={1}
        squareStartLine={1}
      />,
    ),
  ).toMatchSnapshot();
});
