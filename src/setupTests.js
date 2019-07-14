import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockFetch from 'jest-fetch-mock';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('./assets');
jest.mock('./pages/blog');
jest.mock('./pages/fiction');
jest.mock('./pages/games');
jest.mock('./pages/misc');
jest.mock('./pages/web');

global.fetch = mockFetch;
global.waitForNextTick = () =>
  new Promise(resolve => {
    process.nextTick(resolve);
  });
