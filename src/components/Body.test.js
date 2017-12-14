import { shallow } from 'enzyme';
import React from 'react';

import Body from './Body';

jest.mock('react-scrollarea', () => 'ScrollArea');

it('renders correctly', () => {
  expect(shallow(<Body />)).toMatchSnapshot();
});
