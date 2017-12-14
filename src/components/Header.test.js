import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

it('renders correctly', () => {
  expect(
    shallow(
      <MemoryRouter initialEntries={[{ pathname: '/', key: '/' }]}>
        <Header homeRoute={{ path: '/' }} />
      </MemoryRouter>,
    ),
  ).toMatchSnapshot();
});
