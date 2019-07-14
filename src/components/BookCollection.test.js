import { shallow } from 'enzyme';
import React from 'react';

import BookCollection from './BookCollection';

jest.mock('../helpers/OpenLibrary');

it('renders correctly', async () => {
  const wrapper = shallow(
    <BookCollection isbns={['0123456789', '0123456789ABC']} />,
  );

  await waitForNextTick();

  expect(wrapper).toMatchSnapshot();
});
