import React, { Component, Fragment } from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Header from './components/Header';
import Body from './components/Body';
import ErrorPage from './components/ErrorPage';
import Footer from './components/Footer';
import IndexPage from './components/IndexPage';
import LoadingPage from './components/LoadingPage';
import MarkdownPageBundle from './components/MarkdownPageBundle';
import ScrollToTopOnMount from './components/ScrollToTopOnMount';

import routes, { homeRoute, redirectedRoutes, topRoutes } from './routes';

import './styles/transitions.css';

import './App.css';

class App extends Component {
  state = {
    pointerPosition: null,
  };

  // TODO: Update on touch events.
  // TODO: Update on keyboard navigation (such as change of focus).
  updatePointerPosition({ nativeEvent: { clientX, clientY } }) {
    this.setState({ pointerPosition: { x: clientX, y: clientY } });
  }

  componentDidMount() {
    routes.forEach(({ loadContent }) => loadContent && loadContent());
  }

  render() {
    const { pointerPosition } = this.state;

    return (
      <Router>
        <div
          className="App"
          onMouseMove={event => this.updatePointerPosition(event)}
        >
          {routes.map((route, index) => (
            <Route
              key={route.name || index}
              path={route.path}
              exact={route.exact}
              render={() => (
                <Helmet>
                  <title>
                    {route.title ? `${route.title} | ` : ''}erbridge
                  </title>
                </Helmet>
              )}
            />
          ))}
          <Header
            homeRoute={homeRoute}
            pointerPosition={pointerPosition}
            routes={topRoutes}
          />
          <Body className="App__body" pointerPosition={pointerPosition}>
            <Route
              render={({ location }) => (
                <ReactCSSTransitionReplace
                  transitionName="fade"
                  transitionEnterTimeout={250}
                  transitionLeaveTimeout={250}
                >
                  <div key={location.key}>
                    <Switch location={location}>
                      {routes.map((route, index) => (
                        <Route
                          key={route.name || index}
                          path={route.path}
                          exact={route.exact}
                          render={() => (
                            <Fragment>
                              <ScrollToTopOnMount />
                              {route.loadContent && (
                                <MarkdownPageBundle
                                  date={route.date}
                                  image={route.image}
                                  links={route.links}
                                  loadContent={route.loadContent}
                                  placeholder={
                                    <LoadingPage
                                      pointerPosition={pointerPosition}
                                    />
                                  }
                                  showHeadingImage={route.showHeadingImage}
                                  styles={route.styles}
                                  subtitle={route.subtitle}
                                  tags={route.tags}
                                  title={route.title}
                                />
                              )}
                              {route.routes &&
                                route.routes.length && (
                                  <IndexPage
                                    routes={route.routes}
                                    title={route.title}
                                  />
                                )}
                            </Fragment>
                          )}
                        />
                      ))}
                      {redirectedRoutes.map((route, index) => (
                        <Redirect
                          key={route.name || index}
                          path={route.path}
                          to={route.to}
                          exact={route.exact}
                        />
                      ))}
                      <Route component={ErrorPage} />
                    </Switch>
                  </div>
                </ReactCSSTransitionReplace>
              )}
            />
          </Body>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
