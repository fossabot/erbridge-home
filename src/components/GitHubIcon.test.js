import { shallow } from 'enzyme';
import React from 'react';

import GitHubIcon from './GitHubIcon';

it('renders correctly', () => {
  expect(shallow(<GitHubIcon />)).toMatchSnapshot();
});
