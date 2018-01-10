import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('./assets');
jest.mock('./pages/blog');
jest.mock('./pages/fiction');
jest.mock('./pages/games');
jest.mock('./pages/misc');
jest.mock('./pages/tools');
jest.mock('./pages/web');
