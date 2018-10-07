import { shallow } from 'enzyme';
import React from 'react';

import MarkdownPageBundle from './MarkdownPageBundle';

it('renders correctly', () => {
  expect(
    shallow(
      <MarkdownPageBundle loadContent={async () => () => <p>content</p>} />,
    ),
  ).toMatchSnapshot();
});
