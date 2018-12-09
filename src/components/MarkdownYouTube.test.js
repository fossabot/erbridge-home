import { shallow } from 'enzyme';
import React from 'react';

import MarkdownYouTube from './MarkdownYouTube';

it('renders correctly', () => {
  expect(shallow(<MarkdownYouTube videoId="test-id" />)).toMatchSnapshot();
});
