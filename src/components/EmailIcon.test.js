import { shallow } from 'enzyme';
import React from 'react';

import EmailIcon from './EmailIcon';

it('renders correctly', () => {
  expect(shallow(<EmailIcon />)).toMatchSnapshot();
});
