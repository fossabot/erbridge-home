import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import redirectedRoutePropType from '../prop-types/redirectedRoutePropType';
import routePropType from '../prop-types/routePropType';

import ErrorPage from './ErrorPage';
import Footer from './Footer';
import IndexPage from './IndexPage';
import LoadingPage from './LoadingPage';
import Logo from './Logo';
import MarkdownPageBundle from './MarkdownPageBundle';
import ScrollArea from './ScrollArea';
import ScrollToTopOnMount from './ScrollToTopOnMount';

import './Body.scss';

class Body extends Component {
  static propTypes = {
    className: PropTypes.string,
    routes: PropTypes.arrayOf(routePropType).isRequired,
    redirectedRoutes: PropTypes.arrayOf(redirectedRoutePropType),
  };

  state = {
    isScrolling: false,
  };

  render() {
    const { className, routes, redirectedRoutes } = this.props;
    const { isScrolling } = this.state;

    return (
      <div className={classnames(className, 'Body')}>
        <Logo className="Body__logo" focused />
        <ScrollArea
          className="Body__scrollarea"
          renderView={({ ...props }) => (
            <div className="Body__scrollarea__view" {...props} />
          )}
          renderTrackHorizontal={({ ...props }) => (
            <div
              className={classnames(
                'Body__scrollarea__track',
                'Body__scrollarea__track--horizontal',
                { 'Body__scrollarea__track--active': isScrolling },
              )}
              {...props}
            />
          )}
          renderTrackVertical={({ ...props }) => (
            <div
              className={classnames(
                'Body__scrollarea__track',
                'Body__scrollarea__track--vertical',
                { 'Body__scrollarea__track--active': isScrolling },
              )}
              {...props}
            />
          )}
          renderThumbHorizontal={({ ...props }) => (
            <div className="Body__scrollarea__thumb" {...props} />
          )}
          renderThumbVertical={({ ...props }) => (
            <div className="Body__scrollarea__thumb" {...props} />
          )}
          hideTracksWhenNotNeeded
          onScrollStart={() => this.setState({ isScrolling: true })}
          onScrollStop={() => this.setState({ isScrolling: false })}
        >
          <div className="Body__content">
            <Switch>
              {routes.map((route, index) => (
                <Route key={route.name || index} path={route.path} exact>
                  <ScrollToTopOnMount />
                  {route.loadContent && (
                    <MarkdownPageBundle
                      date={route.date}
                      image={route.image}
                      links={route.links}
                      loadContent={route.loadContent}
                      placeholder={<LoadingPage />}
                      showHeadingImage={route.showHeadingImage}
                      styles={route.styles}
                      subtitle={route.subtitle}
                      tags={route.tags}
                      title={route.title}
                    />
                  )}
                  {route.routes && route.routes.length && (
                    <IndexPage routes={route.routes} title={route.title} />
                  )}
                </Route>
              ))}
              {redirectedRoutes &&
                redirectedRoutes.map((route, index) => (
                  <Redirect
                    key={route.name || index}
                    path={route.path}
                    to={route.to}
                    exact
                  />
                ))}
              <Route component={ErrorPage} />
            </Switch>
          </div>
          <Footer className="Body__footer" />
        </ScrollArea>
      </div>
    );
  }
}

export default Body;
