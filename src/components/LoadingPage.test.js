import { shallow } from 'enzyme';
import React from 'react';

import LoadingPage from './LoadingPage';

it('renders correctly', () => {
  expect(shallow(<LoadingPage />)).toMatchSnapshot();
});
