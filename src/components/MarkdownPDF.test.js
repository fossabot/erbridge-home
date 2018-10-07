import { shallow } from 'enzyme';
import React from 'react';

import MarkdownPDF from './MarkdownPDF';

it('renders correctly', () => {
  expect(
    shallow(
      <MarkdownPDF title="Example" src="/assets/example.pdf" paperSize="A4" />,
    ),
  ).toMatchSnapshot();
});
