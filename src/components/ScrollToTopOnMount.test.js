import { shallow } from 'enzyme';
import React from 'react';

import ScrollToTopOnMount from './ScrollToTopOnMount';

it('renders correctly', () => {
  expect(shallow(<ScrollToTopOnMount />)).toMatchSnapshot();
});
