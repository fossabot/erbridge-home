import React from 'react';
import ReactDOM from 'react-dom';

import MarkdownPage from './MarkdownPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MarkdownPage content="<p>Some HTML</p>" />, div);
});
