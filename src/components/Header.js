import React from 'react';

import Logo from './Logo';

import './Header.css';

const Header = () =>
  <div className="Header">
    <div className="Header__content">
      <Logo className="Header__logo" />
    </div>
  </div>;

export default Header;
