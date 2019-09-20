import { shallow } from 'enzyme';
import React from 'react';

import Body from './Body';

it('renders correctly', () => {
  expect(
    shallow(
      <Body className="Test__body">
        <p>Test content</p>
      </Body>,
    ),
  ).toMatchSnapshot();
});
