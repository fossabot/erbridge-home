import { shallow } from 'enzyme';
import React from 'react';

import ScrollArea from './ScrollArea';

it('renders correctly', () => {
  expect(shallow(<ScrollArea />)).toMatchSnapshot();
});
