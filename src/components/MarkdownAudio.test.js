import { shallow } from 'enzyme';
import React from 'react';

import MarkdownAudio from './MarkdownAudio';

it('renders correctly', () => {
  expect(shallow(<MarkdownAudio src="/assets/test.mp3" />)).toMatchSnapshot();
});
