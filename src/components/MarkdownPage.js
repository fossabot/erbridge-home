import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getAsset } from '../assets';

import ExternalLink from './ExternalLink';
import ViewableImage from './ViewableImage';

import './MarkdownPage.scss';

const markdownComponents = {
  a({ href, children }) {
    const LinkComponent = href && href.startsWith('/') ? Link : ExternalLink;

    return <LinkComponent to={href}>{children}</LinkComponent>;
  },

  img({ alt, className, src }) {
    return (
      <ViewableImage
        className={classnames(className, 'MarkdownPage__image')}
        src={getAsset(src)}
        alt={alt || ''}
      />
    );
  },
};

class MarkdownPage extends Component {
  static propTypes = {
    content: PropTypes.func.isRequired,
    date: PropTypes.string,
    image: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ),
    showHeadingImage: PropTypes.bool,
    styles: PropTypes.arrayOf(PropTypes.string),
    subtitle: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    title: PropTypes.string,
  };

  state = {
    loadedStyles: [],
  };

  static async getDerivedStateFromProps(nextProps, prevState) {
    const nextState = { ...prevState };

    if (nextProps.styles) {
      for (const style of nextProps.styles) {
        if (!prevState.loadedStyles.includes(style)) {
          // FIXME: Is this the right place to be doing this?
          require(`../${style}.scss`);

          nextState.loadedStyles.push(style);
        }
      }
    }

    return nextState;
  }

  render() {
    const {
      content,
      date,
      image,
      links,
      showHeadingImage,
      subtitle,
      tags,
      title,
    } = this.props;

    return (
      <div className="MarkdownPage">
        {image &&
          showHeadingImage && (
            <h1 className="MarkdownPage__heading-image">
              <ViewableImage src={getAsset(image)} alt="" />
            </h1>
          )}
        {title && [
          <h1
            key="title"
            className={classnames('MarkdownPage__title', {
              'MarkdownPage__title--has-subtitle-or-date': subtitle || date,
            })}
          >
            {title}
          </h1>,
          subtitle && (
            <h2
              key="subtitle"
              className={classnames('MarkdownPage__subtitle', {
                'MarkdownPage__subtitle--has-date': date,
              })}
            >
              {subtitle}
            </h2>
          ),
          date && (
            <p key="date" className="MarkdownPage__date">
              {date}
            </p>
          ),
        ]}
        {links && (
          <p
            className={classnames('MarkdownPage__links', {
              'MarkdownPage__links--has-tags': tags,
            })}
          >
            {links
              .map(({ label, href }) => {
                const LinkComponent =
                  href && href.startsWith('/') ? Link : ExternalLink;

                return (
                  <LinkComponent key={label} to={href}>
                    {label}
                  </LinkComponent>
                );
              })
              .reduce((prev, curr) => [prev, ' | ', curr])}
          </p>
        )}
        {tags && (
          <p className="MarkdownPage__tags">
            {tags.map((tagSet, i) => (
              <span key={i} className="MarkdownPage__tag-set">
                {tagSet
                  .map((tag, j) => (
                    <span key={j} className="MarkdownPage__tag">
                      {tag}
                    </span>
                  ))
                  .reduce((prev, curr) => [prev, ' | ', curr])}
              </span>
            ))}
          </p>
        )}
        {content({ components: markdownComponents })}
      </div>
    );
  }
}

export default MarkdownPage;
