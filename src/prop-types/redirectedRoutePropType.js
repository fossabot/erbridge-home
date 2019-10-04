import PropTypes from 'prop-types';

const redirectedRoutePropType = PropTypes.shape({
  path: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
});

export default redirectedRoutePropType;
