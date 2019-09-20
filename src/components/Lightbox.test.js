import { shallow } from 'enzyme';
import React from 'react';

import Lightbox from './Lightbox';

it('renders correctly with all props', () => {
  expect(
    shallow(
      <Lightbox src="/test.jpg" isOpen onClose={() => console.log('test')} />,
    ),
  ).toMatchSnapshot();
});

it('renders correctly without optional props', () => {
  expect(shallow(<Lightbox src="/test.jpg" />)).toMatchSnapshot();
});

it('renders correctly when not open', () => {
  expect(
    shallow(<Lightbox src="/test.jpg" isOpen={false} />),
  ).toMatchSnapshot();
});
