import classnames from 'classnames';
import { Parser, ProcessNodeDefinitions } from 'html-to-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getAsset } from '../assets';

import ExternalLink from './ExternalLink';
import ViewableImage from './ViewableImage';

import './MarkdownPage.scss';

const htmlParser = new Parser();

const processNodeDefinitions = new ProcessNodeDefinitions(React);
const processingInstructions = [
  {
    shouldProcessNode(node) {
      return node.type === 'tag' && node.name === 'a';
    },
    processNode(node, children, index) {
      const LinkComponent =
        node.attribs && node.attribs.href && node.attribs.href.startsWith('/')
          ? Link
          : ExternalLink;

      return (
        <LinkComponent key={index} to={node.attribs.href}>
          {children}
        </LinkComponent>
      );
    },
  },
  {
    shouldProcessNode(node) {
      return node.type === 'tag' && node.name === 'img';
    },
    processNode(node, children, index) {
      return (
        <ViewableImage
          key={index}
          className={classnames(node.attribs.class, 'MarkdownPage__image')}
          src={getAsset(node.attribs.src)}
          alt={node.attribs.alt || ''}
        />
      );
    },
  },
  {
    shouldProcessNode(node) {
      return node.type === 'tag' && node.name === 'pdf';
    },
    processNode(node, children, index) {
      return (
        <p
          key={index}
          className={classnames('PDF', `PDF--${node.attribs.papersize}`)}
        >
          <iframe
            className="PDF__content"
            title={node.attribs.title}
            src={getAsset(node.attribs.src)}
            frameBorder="0"
          />
        </p>
      );
    },
  },
  {
    shouldProcessNode(node) {
      return node.type === 'tag' && node.name === 'youtube';
    },
    processNode(node, children, index) {
      return (
        <p key={index} className="YouTube">
          <iframe
            className="YouTube__content"
            title={node.attribs.title}
            src={`https://www.youtube.com/embed/${node.attribs.videoid}`}
            frameBorder="0"
          />
        </p>
      );
    },
  },
  {
    shouldProcessNode(node) {
      return true;
    },
    processNode: processNodeDefinitions.processDefaultNode,
  },
];

class MarkdownPage extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
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
    content: '',
    rawContent: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.styles) {
      nextProps.styles.forEach(style => {
        require(`../${style}.scss`);
      });
    }

    let nextState = null;

    const rawContent = nextProps.content || '';

    if (rawContent !== prevState.rawContent) {
      nextState = {
        content: htmlParser.parseWithInstructions(
          rawContent.replace(/\\\n/g, '<br>'),
          () => true,
          processingInstructions,
        ),
        rawContent,
      };
    }

    return nextState;
  }

  render() {
    const {
      date,
      image,
      links,
      showHeadingImage,
      subtitle,
      tags,
      title,
    } = this.props;
    const { content } = this.state;

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
        {content}
      </div>
    );
  }
}

export default MarkdownPage;
