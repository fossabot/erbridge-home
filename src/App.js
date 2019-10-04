import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Head from './components/Head';
import Header from './components/Header';
import Body from './components/Body';
import PointerContext from './components/PointerContext';

import routes, { homeRoute, redirectedRoutes, topRoutes } from './routes';

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
        <Head routes={routes} />
        <div
          className="App"
          onMouseMove={event => this.updatePointerPosition(event)}
        >
          <PointerContext.Provider value={pointerPosition}>
            <Header homeRoute={homeRoute} routes={topRoutes} />
            <Body
              className="App__body"
              routes={routes}
              redirectedRoutes={redirectedRoutes}
            />
          </PointerContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
