import { Parser, ProcessNodeDefinitions } from 'html-to-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import assets from '../assets';

import ExternalLink from './ExternalLink';
import ViewableImage from './ViewableImage';

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
      return true;
    },
    processNode: processNodeDefinitions.processDefaultNode,
  },
];

class MarkdownPage extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(PropTypes.string),
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
    const { content } = this.props;

    // TODO: Only parse when the content changes.
    return (
      <div className="MarkdownPage">
        {htmlParser.parseWithInstructions(
          content,
          () => true,
          processingInstructions,
        )}
      </div>
    );
  }
}

export default MarkdownPage;
