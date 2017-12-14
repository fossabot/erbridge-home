import { shallow } from 'enzyme';
import React from 'react';

import LogoParticle from './LogoParticle';

it('renders correctly', () => {
  expect(shallow(<LogoParticle radius={1} x={0} y={0} />)).toMatchSnapshot();
});
