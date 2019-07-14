import { shallow } from 'enzyme';
import React from 'react';

import Lightbox from './Lightbox';

it('renders correctly', () => {
  expect(shallow(<Lightbox src="/test.jpg" isOpen />)).toMatchSnapshot();
});
