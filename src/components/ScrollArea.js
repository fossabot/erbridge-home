import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';

class ScrollArea extends Scrollbars {
  static childContextTypes = {
    scrollArea: PropTypes.object,
  };

  getChildContext() {
    return {
      scrollArea: {
        reset: () => {
          this.scrollToTop();
          this.scrollToLeft();
        },
      },
    };
  }
}

export default ScrollArea;
