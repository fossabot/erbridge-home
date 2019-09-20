import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

it('renders correctly with all props', () => {
  expect(
    shallow(
      <Header
        homeRoute={{ path: '/' }}
        routes={[
          { link: 'A', name: 'a', path: '/a' },
          { link: 'B', name: 'b', path: '/b' },
          { link: 'C', name: 'c', path: '/c' },
        ]}
      />,
      {
        wrappingComponent: MemoryRouter,
        wrappingComponentProps: {
          initialEntries: [{ pathname: '/', key: '/' }],
        },
      },
    ),
  ).toMatchSnapshot();
});

it('renders correctly without optional props', () => {
  expect(
    shallow(<Header homeRoute={{ path: '/' }} />, {
      wrappingComponent: MemoryRouter,
      wrappingComponentProps: {
        initialEntries: [{ pathname: '/', key: '/' }],
      },
    }),
  ).toMatchSnapshot();
});

it('renders correctly with empty routes', () => {
  expect(
    shallow(<Header homeRoute={{ path: '/' }} routes={[]} />, {
      wrappingComponent: MemoryRouter,
      wrappingComponentProps: {
        initialEntries: [{ pathname: '/', key: '/' }],
      },
    }),
  ).toMatchSnapshot();
});
