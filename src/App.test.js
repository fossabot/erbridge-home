import { shallow } from 'enzyme';
import React from 'react';

import App from './App';

jest.mock('./pages/home.mdx', () => ({ meta: {}, default: () => 'home.mdx' }));

it('renders correctly', () => {
  expect(shallow(<App />)).toMatchSnapshot();
});
