import { shallow } from 'enzyme';
import React from 'react';

import Logo from './Logo';

it('renders correctly', () => {
  expect(shallow(<Logo />)).toMatchSnapshot();
});
