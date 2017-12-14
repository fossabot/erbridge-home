import { shallow } from 'enzyme';
import React from 'react';

import ErrorPage from './ErrorPage';

it('renders correctly', () => {
  expect(shallow(<ErrorPage />)).toMatchSnapshot();
});
