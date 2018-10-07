import { shallow } from 'enzyme';
import React from 'react';

import MarkdownPage from './MarkdownPage';

it('renders correctly', () => {
  expect(
    shallow(<MarkdownPage content={() => <p>content</p>} />),
  ).toMatchSnapshot();
});
