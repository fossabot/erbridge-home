import classnames from 'classnames';
import { Parser, ProcessNodeDefinitions } from 'html-to-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import assets from '../assets';

import ExternalLink from './ExternalLink';
import ViewableImage from './ViewableImage';

import './MarkdownPage.css';

const htmlParser = new Parser();

const processNodeDefinitions = new ProcessNodeDefinitions(React);
const processingInstructions = [
  {
    shouldProcessNode(node) {
      return node.type && node.type === 'tag' && node.name && node.name === 'a';
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
      return (
        node.type && node.type === 'tag' && node.name && node.name === 'img'
      );
    },
    processNode(node, children, index) {
      return (
        <ViewableImage
          key={index}
          className={node.attribs.class}
          src={assets[node.attribs.src] || node.attribs.src}
          alt={node.attribs.alt || ''}
        />
      );
    },
  },
  {
    shouldProcessNode(node) {
      return (
        node.type && node.type === 'tag' && node.name && node.name === 'pdf'
      );
    },
    processNode(node, children, index) {
      return (
        <div
          key={index}
          className={classnames('PDF', `PDF--${node.attribs.papersize}`)}
        >
          <iframe
            className="PDF__content"
            title={node.attribs.title}
            src={assets[node.attribs.src] || node.attribs.src}
            frameBorder="0"
          />
        </div>
      );
    },
  },
  {
    shouldProcessNode(node) {
      return (
        node.type && node.type === 'tag' && node.name && node.name === 'youtube'
      );
    },
    processNode(node, children, index) {
      return (
        <div key={index} className="YouTube">
          <iframe
            className="YouTube__content"
            title={node.attribs.title}
            src={`https://www.youtube.com/embed/${node.attribs.videoid}`}
            frameBorder="0"
          />
        </div>
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
    links: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ),
    styles: PropTypes.arrayOf(PropTypes.string),
    subtitle: PropTypes.string,
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.loadExtraStyles(props);
  }

  loadExtraStyles(props) {
    if (props.styles) {
      props.styles.forEach(style => {
        require(`../${style}.css`);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.loadExtraStyles(nextProps);
  }

  render() {
    const { content, date, links, subtitle, title } = this.props;

    // TODO: Only parse when the content changes.
    return (
      <div className="MarkdownPage">
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
          <p className="MarkdownPage__links">
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
        {htmlParser.parseWithInstructions(
          content.replace(/\\\n/g, '<br>'),
          () => true,
          processingInstructions,
        )}
      </div>
    );
  }
}

export default MarkdownPage;
