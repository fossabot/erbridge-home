import { shallow } from 'enzyme';
import React from 'react';

import LinkedInIcon from './LinkedInIcon';

it('renders correctly', () => {
  expect(shallow(<LinkedInIcon />)).toMatchSnapshot();
});
