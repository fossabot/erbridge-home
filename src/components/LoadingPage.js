import React from 'react';

import Logo from './Logo';

import './LoadingPage.css';

const LoadingPage = () => (
  <div className="LoadingPage">
    <Logo className="LoadingPage__logo" focused />
  </div>
);

export default LoadingPage;
