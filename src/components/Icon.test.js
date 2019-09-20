import { shallow } from 'enzyme';
import React from 'react';

import Icon from './Icon';

it('renders correctly', () => {
  expect(
    shallow(
      <Icon className="Test__icon">
        <svg />
      </Icon>,
    ),
  ).toMatchSnapshot();
});
