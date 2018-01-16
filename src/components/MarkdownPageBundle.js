import PropTypes from 'prop-types';
import React, { Component } from 'react';

import MarkdownPage from './MarkdownPage';

class MarkdownPageBundle extends Component {
  static propTypes = {
    date: PropTypes.string,
    image: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ),
    loadContent: PropTypes.func.isRequired,
    placeholder: PropTypes.node,
    showHeadingImage: PropTypes.bool,
    styles: PropTypes.arrayOf(PropTypes.string),
    subtitle: PropTypes.string,
    title: PropTypes.string,
  };

  state = {
    content: null,
  };

  async loadContent(props) {
    this.setState({ content: null });
    this.setState({ content: await props.loadContent() });
  }

  componentWillMount() {
    this.loadContent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loadContent !== this.props.loadContent) {
      this.loadContent(nextProps);
    }
  }

  render() {
    const {
      date,
      image,
      links,
      placeholder,
      showHeadingImage,
      styles,
      subtitle,
      title,
    } = this.props;
    const { content } = this.state;

    return content ? (
      <MarkdownPage
        content={content}
        date={date}
        image={image}
        links={links}
        showHeadingImage={showHeadingImage}
        styles={styles}
        title={title}
        subtitle={subtitle}
      />
    ) : (
      placeholder
    );
  }
}

export default MarkdownPageBundle;
