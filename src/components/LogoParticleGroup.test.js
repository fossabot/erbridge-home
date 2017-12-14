import { shallow } from 'enzyme';
import React from 'react';

import LogoParticleGroup from './LogoParticleGroup';

it('renders correctly', () => {
  expect(
    shallow(<LogoParticleGroup viewBox={{ width: 100, height: 100 }} />),
  ).toMatchSnapshot();
});
