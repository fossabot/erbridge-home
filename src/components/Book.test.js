import { shallow } from 'enzyme';
import React from 'react';

import Book from './Book';

it('renders correctly', () => {
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
