import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './IndexPage.css';

class IndexPage extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        exact: PropTypes.bool,
        name: PropTypes.string,
        path: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
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
            <div
              className={classnames('IndexPage__link__title', {
                'IndexPage__link__title--has-subtitle-or-date':
                  route.subtitle || route.date,
              })}
            >
              {route.title}
            </div>
            {route.subtitle && (
              <div
                className={classnames('IndexPage__link__subtitle', {
                  'IndexPage__link__subtitle--has-date': route.date,
                })}
              >
                {route.subtitle}
              </div>
            )}
            {route.date && (
              <div className="IndexPage__link__date">{route.date}</div>
            )}
          </NavLink>
        ))}
      </div>
    );
  }
}

export default IndexPage;
