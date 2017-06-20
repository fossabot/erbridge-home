import React from 'react';

import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

import './App.css';

const App = () =>
  <div className="App"><Header /><Body className="App__body" /><Footer /></div>;

export default App;
