import { shallow } from 'enzyme';
import React from 'react';

import ViewableImage from './ViewableImage';

it('renders correctly', () => {
  expect(
    shallow(
      <ViewableImage className="Test__image" src="/test.jpg" alt="test" />,
    ),
  ).toMatchSnapshot();
});
