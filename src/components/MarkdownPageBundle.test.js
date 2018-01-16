import { shallow } from 'enzyme';
import React from 'react';

import MarkdownPageBundle from './MarkdownPageBundle';

it('renders correctly', () => {
  expect(
    shallow(<MarkdownPageBundle loadContent={() => 'content'} />),
  ).toMatchSnapshot();
});
