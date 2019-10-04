import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';

import routePropType from '../prop-types/routePropType';

class Head extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(routePropType).isRequired,
  };

  render() {
    const { routes } = this.props;

    return routes.map((route, index) => (
      <Route key={route.name || index} path={route.path} exact>
        <Helmet>
          <title>
            {route.title ? `${route.title} | ` : ''}
            erbridge
          </title>
        </Helmet>
      </Route>
    ));
  }
}

export default Head;
