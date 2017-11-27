import React, { Component } from 'react';
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
import MarkdownPage from './components/MarkdownPage';

import routes, { homeRoute, redirectedRoutes, topRoutes } from './routes';

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
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={route.name || index}
                  path={route.path}
                  exact={route.exact}
                  render={() => (
                    <div>
                      {route.content && (
                        <MarkdownPage
                          content={route.content}
                          date={route.date}
                          styles={route.styles}
                          title={route.title}
                        />
                      )}
                      {route.routes &&
                        route.routes.length && (
                          <IndexPage routes={route.routes} />
                        )}
                    </div>
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
          </Body>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
