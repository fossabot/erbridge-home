import { shallow } from 'enzyme';
import React from 'react';

import ExternalLink from './ExternalLink';

it('renders correctly', () => {
  expect(
    shallow(<ExternalLink to="http://example.com/">Example</ExternalLink>),
  ).toMatchSnapshot();
});
