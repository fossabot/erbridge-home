import React from 'react';
import ReactDOM from 'react-dom';

import LogoParticleGroup from './LogoParticleGroup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <LogoParticleGroup viewBox={{ width: 100, height: 100 }} />,
    div,
  );
});
