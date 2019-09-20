import { shallow } from 'enzyme';
import React from 'react';

import ScrollToTopOnMount from './ScrollToTopOnMount';

// TODO: Test props.
it('renders correctly', () => {
  expect(shallow(<ScrollToTopOnMount />)).toMatchSnapshot();
});
