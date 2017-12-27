import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './IndexPage.css';

class IndexPage extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        exact: PropTypes.bool,
        name: PropTypes.string,
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
          <NavLink
            key={route.name || index}
            className="IndexPage__link"
            to={route.path}
            exact={route.exact}
          >
            <div className="IndexPage__link__title">{route.title}</div>
          </NavLink>
        ))}
      </div>
    );
  }
}

export default IndexPage;
