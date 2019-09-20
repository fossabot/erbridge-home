import { shallow } from 'enzyme';
import React from 'react';

import MarkdownPageBundle from './MarkdownPageBundle';

// TODO: Write tests for all props and only required props before and after
//       content is loaded.
it('renders correctly', () => {
  expect(
    shallow(
      <MarkdownPageBundle
        loadContent={async () => props => <div {...props}>content</div>}
      />,
    ),
  ).toMatchSnapshot();
});
