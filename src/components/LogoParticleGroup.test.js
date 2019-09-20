import { shallow } from 'enzyme';
import React from 'react';

import LogoParticleGroup from './LogoParticleGroup';

it('renders correctly with all props', () => {
  expect(
    shallow(
      <LogoParticleGroup
        focused
        pointerPosition={{ x: 15, y: 25 }}
        viewBox={{ width: 100, height: 200 }}
      />,
    ),
  ).toMatchSnapshot();
});

it('renders correctly without optional props', () => {
  expect(
    shallow(<LogoParticleGroup viewBox={{ width: 100, height: 200 }} />),
  ).toMatchSnapshot();
});

it('renders correctly when not focused', () => {
  expect(
    shallow(
      <LogoParticleGroup
        pointerPosition={{ x: 15, y: 25 }}
        viewBox={{ width: 100, height: 200 }}
      />,
    ),
  ).toMatchSnapshot();
});
