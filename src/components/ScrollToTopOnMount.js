import PropTypes from 'prop-types';
import { Component } from 'react';
import { withRouter } from 'react-router';

class ScrollToTopOnMount extends Component {
  static contextTypes = {
    scrollArea: PropTypes.object,
  };

  componentWillMount() {
    const { scrollArea } = this.context;

    if (scrollArea) {
      scrollArea.reset();
    } else {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTopOnMount);
