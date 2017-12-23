import { shallow } from 'enzyme';
import React from 'react';

import TwitterIcon from './TwitterIcon';

it('renders correctly', () => {
  expect(shallow(<TwitterIcon />)).toMatchSnapshot();
});
