import React, { Component } from 'react';

import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

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
      <div
        className="App"
        onMouseMove={event => this.updatePointerPosition(event)}
      >
        <Header pointerPosition={pointerPosition} />
        <Body className="App__body" />
        <Footer />
      </div>
    );
  }
}

export default App;
