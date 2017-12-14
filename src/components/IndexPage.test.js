import { shallow } from 'enzyme';
import React from 'react';

import IndexPage from './IndexPage';

it('renders correctly', () => {
  expect(shallow(<IndexPage routes={[]} />)).toMatchSnapshot();
});
