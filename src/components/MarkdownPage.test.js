import { shallow } from 'enzyme';
import React from 'react';

import MarkdownPage from './MarkdownPage';

it('renders correctly', () => {
  expect(
    shallow(<MarkdownPage content={props => <div {...props}>content</div>} />),
  ).toMatchSnapshot();
});
