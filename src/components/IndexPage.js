import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import assets from '../assets';

import './IndexPage.css';

class IndexPage extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
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
        {routes.map((route, index) => {
          const image = assets[route.image] || route.image;

          return (
            <Link
              key={route.name || index}
              className={classnames('IndexPage__link', {
                'IndexPage__link--has-image': image,
              })}
              to={route.path}
              style={{
                backgroundImage: `url(${image})`,
              }}
            >
              <div className="IndexPage__link__title">{route.title}</div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default IndexPage;
