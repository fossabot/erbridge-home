import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('./assets');
jest.mock('./blog');
jest.mock('./fiction');
jest.mock('./games');
jest.mock('./misc');
jest.mock('./tools');
jest.mock('./web');
