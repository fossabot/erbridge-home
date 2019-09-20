import { shallow } from 'enzyme';
import React from 'react';

import IndexPage from './IndexPage';

it('renders correctly with all props', () => {
  expect(
    shallow(
      <IndexPage
        title="Test"
        routes={[
          { path: '/a', title: 'A' },
          { link: 'Link to B', path: '/b', title: 'B' },
          {
            image: '/path/to/c.jpg',
            link: 'Link to C',
            path: '/c',
            title: 'C',
          },
          {
            image: '/path/to/d.jpg',
            link: 'Link to D',
            name: 'd_name',
            path: '/d',
            title: 'D',
          },
        ]}
      />,
    ),
  ).toMatchSnapshot();
});

it('renders correctly without optional props', () => {
  expect(
    shallow(
      <IndexPage
        routes={[
          { path: '/a', title: 'A' },
          { link: 'Link to B', path: '/b', title: 'B' },
          {
            image: '/path/to/c.jpg',
            link: 'Link to C',
            path: '/c',
            title: 'C',
          },
          {
            image: '/path/to/d.jpg',
            link: 'Link to D',
            name: 'd_name',
            path: '/d',
            title: 'D',
          },
        ]}
      />,
    ),
  ).toMatchSnapshot();
});

it('renders correctly with empty routes', () => {
  expect(shallow(<IndexPage routes={[]} />)).toMatchSnapshot();
});
