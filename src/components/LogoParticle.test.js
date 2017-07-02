import React from 'react';
import ReactDOM from 'react-dom';

import LogoParticle from './LogoParticle';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LogoParticle radius={1} x={0} y={0} />, div);
});
