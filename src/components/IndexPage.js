import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getAsset } from '../assets';

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
    title: PropTypes.string,
  };

  render() {
    const { routes, title } = this.props;

    return (
      <div className="IndexPage">
        <div className="IndexPage__content">
          {title && <h1>{title}</h1>}
          <div className="IndexPage__links">
            {routes.map((route, index) => {
              const image = getAsset(route.image);

              return (
                <Link
                  key={route.name || index}
                  className="IndexPage__link"
                  to={route.path}
                >
                  {image && (
                    <div
                      className="IndexPage__link__image"
                      style={{
                        backgroundImage: `url(${image})`,
                      }}
                    />
                  )}
                  <div className="IndexPage__link__content">
                    <div className="IndexPage__link__text">{route.title}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default IndexPage;
