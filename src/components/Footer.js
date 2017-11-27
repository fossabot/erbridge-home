import React from 'react';

import ExternalLink from './ExternalLink';

import './Footer.css';

const Footer = () => (
  <div className="Footer">
    <div className="Footer__content">
      <div className="Footer__copyright">
        <div className="Footer__copyright-line">© 2015 - 2017 erbridge</div>
        <div className="Footer__copyright-line">
          <ExternalLink to="https://raw.githubusercontent.com/erbridge/erbridge-home/master/LICENSE">
            MIT
          </ExternalLink>{' '}
          (<ExternalLink to="https://github.com/erbridge/erbridge-home">
            code
          </ExternalLink>) |{' '}
          <ExternalLink to="http://creativecommons.org/licenses/by/3.0/">
            CC-BY
          </ExternalLink>{' '}
          (content)
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
