import { shallow } from 'enzyme';
import React from 'react';

import Logo from './Logo';

it('renders correctly with all props', () => {
  expect(shallow(<Logo className="Test__logo" focused />)).toMatchSnapshot();
});

it('renders correctly without optional props', () => {
  expect(shallow(<Logo className="Test__logo" />)).toMatchSnapshot();
});

it('renders correctly when not focused', () => {
  expect(
    shallow(<Logo className="Test__logo" focused={false} />),
  ).toMatchSnapshot();
});
