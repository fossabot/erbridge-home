import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockFetch from 'jest-fetch-mock';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('./assets');

global.fetch = mockFetch;
global.waitForNextTick = () =>
  new Promise(resolve => {
    process.nextTick(resolve);
  });
