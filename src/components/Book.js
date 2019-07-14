import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import ExternalLink from './ExternalLink';

class Book extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
    url: PropTypes.string.isRequired,
  };

  render() {
    const { title, subtitle, authors, url } = this.props;

    return (
      <p>
        <strong>{title}</strong>
        {subtitle && (
          <Fragment>
            : <em>{subtitle}</em>
          </Fragment>
        )}{' '}
        by <strong>{authors.map(author => author.name).join(', ')}</strong> (
        <ExternalLink to={url}>Open Library</ExternalLink>)
      </p>
    );
  }
}

export default Book;
