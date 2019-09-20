import { shallow } from 'enzyme';
import React from 'react';

import Book from './Book';

it('renders correctly with all props', () => {
  expect(
    shallow(
      <Book
        title="Test Title"
        subtitle="Test Subtitle"
        authors={[{ name: 'Test Author' }, { name: 'Another Author' }]}
        url="http://example.com"
      />,
    ),
  ).toMatchSnapshot();
});

it('renders correctly without optional props', () => {
  expect(
    shallow(
      <Book
        title="Test Title"
        authors={[{ name: 'Test Author' }, { name: 'Another Author' }]}
        url="http://example.com"
      />,
    ),
  ).toMatchSnapshot();
});
