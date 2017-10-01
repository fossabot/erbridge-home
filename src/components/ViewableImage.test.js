import React from 'react';
import ReactDOM from 'react-dom';

import ViewableImage from './ViewableImage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ViewableImage src="/test.jpg" alt="test" />, div);
});
