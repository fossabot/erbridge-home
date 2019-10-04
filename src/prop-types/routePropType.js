import PropTypes from 'prop-types';

const routeShape = {
  date: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string,
  loadContent: PropTypes.func,
  name: PropTypes.string,
  navExact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  showHeadingImage: PropTypes.bool,
  styles: PropTypes.arrayOf(PropTypes.string),
  subtitle: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  title: PropTypes.string,
};

routeShape.routes = PropTypes.arrayOf(PropTypes.shape(routeShape));

const routePropType = PropTypes.shape(routeShape);

export default routePropType;
