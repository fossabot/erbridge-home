import { shallow } from 'enzyme';
import React from 'react';

import MarkdownPageBundle from './MarkdownPageBundle';

it('renders correctly', () => {
  expect(
    shallow(
      <MarkdownPageBundle
        loadContent={async () => props => <div {...props}>content</div>}
      />,
    ),
  ).toMatchSnapshot();
});
