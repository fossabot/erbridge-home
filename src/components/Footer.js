import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ExternalLink from './ExternalLink';
import EmailIcon from './EmailIcon';
import GitHubIcon from './GitHubIcon';
import LinkedInIcon from './LinkedInIcon';
import TwitterIcon from './TwitterIcon';

import './Footer.scss';

class Footer extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { className } = this.props;

    return (
      <div className={classnames(className, 'Footer')}>
        <div className="Footer__content">
          <div className="Footer__contact-links">
            <ExternalLink
              className="Footer__contact-link"
              to="https://twitter.com/erbridge"
            >
              <TwitterIcon />
            </ExternalLink>
            <ExternalLink
              className="Footer__contact-link"
              to="https://github.com/erbridge"
            >
              <GitHubIcon />
            </ExternalLink>
            <ExternalLink
              className="Footer__contact-link"
              to="https://www.linkedin.com/in/erbridge"
            >
              <LinkedInIcon />
            </ExternalLink>
            <ExternalLink
              className="Footer__contact-link"
              to="mailto:hello@erbridge.co.uk"
            >
              <EmailIcon />
            </ExternalLink>
          </div>
          <div className="Footer__copyright">
            <div className="Footer__copyright-line">© 2015 - 2019 erbridge</div>
            <div className="Footer__copyright-line">
              <ExternalLink to="https://raw.githubusercontent.com/erbridge/erbridge-home/master/LICENSE">
                MIT
              </ExternalLink>{' '}
              (
              <ExternalLink to="https://github.com/erbridge/erbridge-home">
                code
              </ExternalLink>
              ) |{' '}
              <ExternalLink to="https://creativecommons.org/licenses/by/3.0/">
                CC-BY
              </ExternalLink>{' '}
              (content)
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
