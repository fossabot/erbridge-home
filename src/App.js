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
import PointerContext from './components/PointerContext';
import ScrollToTopOnMount from './components/ScrollToTopOnMount';

import routes, { homeRoute, redirectedRoutes, topRoutes } from './routes';

import './styles/transitions.scss';

import './App.scss';

class App extends Component {
  state = {
    pointerPosition: null,
  };

  // TODO: Update on touch events.
  // TODO: Update on keyboard navigation (such as change of focus).
  updatePointerPosition({ nativeEvent: { clientX, clientY } }) {
    this.setState({ pointerPosition: { x: clientX, y: clientY } });
  }

  async componentDidMount() {
    await Promise.all(
      routes.map(({ loadContent }) => loadContent && loadContent()),
    );
  }

  render() {
    const { pointerPosition } = this.state;

    return (
      <Router>
        <div
          className="App"
          onMouseMove={event => this.updatePointerPosition(event)}
        >
          <PointerContext.Provider value={pointerPosition}>
            {routes.map((route, index) => (
              <Route
                key={route.name || index}
                path={route.path}
                exact
                render={() => (
                  <Helmet>
                    <title>
                      {route.title ? `${route.title} | ` : ''}
                      erbridge
                    </title>
                  </Helmet>
                )}
              />
            ))}
            <Header homeRoute={homeRoute} routes={topRoutes} />
            <Body className="App__body">
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
                            exact
                            render={() => (
                              <Fragment>
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
                            exact
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
          </PointerContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
