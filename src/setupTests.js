import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('./assets');
jest.mock('./blog');
jest.mock('./games');
jest.mock('./fiction');
