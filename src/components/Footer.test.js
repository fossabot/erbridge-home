import { shallow } from 'enzyme';
import React from 'react';

import Footer from './Footer';

it('renders correctly', () => {
  expect(shallow(<Footer />)).toMatchSnapshot();
});
