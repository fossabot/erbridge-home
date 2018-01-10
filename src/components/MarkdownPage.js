import classnames from 'classnames';
import { Parser, ProcessNodeDefinitions } from 'html-to-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getAsset } from '../assets';

import ExternalLink from './ExternalLink';
import ViewableImage from './ViewableImage';

import './MarkdownPage.css';

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
    styles: PropTypes.arrayOf(PropTypes.string),
    subtitle: PropTypes.string,
    title: PropTypes.string,
  };

  state = {
    content: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      content: this.parseContent(props.content || ''),
    };

    this.loadExtraStyles(props);
  }

  parseContent(content) {
    return htmlParser.parseWithInstructions(
      content.replace(/\\\n/g, '<br>'),
      () => true,
      processingInstructions,
    );
  }

  loadExtraStyles(props) {
    if (props.styles) {
      props.styles.forEach(style => {
        require(`../${style}.css`);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.props.content) {
      this.setState({ content: this.parseContent(nextProps.content || '') });
    }

    this.loadExtraStyles(nextProps);
  }

  render() {
    const { date, image, links, subtitle, title } = this.props;
    const { content } = this.state;

    return (
      <div className="MarkdownPage">
        {image && (
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
        {content}
      </div>
    );
  }
}

export default MarkdownPage;
