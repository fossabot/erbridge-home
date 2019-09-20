import { shallow } from 'enzyme';
import React from 'react';

import LogoParticle from './LogoParticle';

it('renders correctly with all props', () => {
  expect(
    shallow(
      <LogoParticle
        groupBoundingRect={{ top: 100, right: 200 }}
        pointerPosition={{ x: 15, y: 25 }}
        radius={1}
        x={0}
        y={0}
      />,
    ),
  ).toMatchSnapshot();
});

it('renders correctly without optional props', () => {
  expect(shallow(<LogoParticle radius={1} x={0} y={0} />)).toMatchSnapshot();
});
