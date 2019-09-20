import { shallow } from 'enzyme';
import React from 'react';

import ScrollArea from './ScrollArea';

// TODO: Test props.
it('renders correctly', () => {
  expect(shallow(<ScrollArea />)).toMatchSnapshot();
});
