import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class IndexPage extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        exact: PropTypes.bool,
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  render() {
    const { routes } = this.props;

    return (
      <div className="IndexPage">
        {routes.map((route, index) => (
          <div key={route.name || index}>
            <NavLink to={route.path} exact={route.exact}>
              {route.title}
            </NavLink>
          </div>
        ))}
      </div>
    );
  }
}

export default IndexPage;
