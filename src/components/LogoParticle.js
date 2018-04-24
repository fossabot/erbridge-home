import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './LogoParticle.css';

class LogoParticle extends Component {
  static propTypes = {
    groupBoundingRect: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
    }),
    pointerPosition: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    radius: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  state = {
    rotation: 0,
  };

  // TODO: Smooth the rotation a little to make very fast movement less janky.
  updateRotation({ groupBoundingRect, pointerPosition }) {
    if (!this.node || (!pointerPosition && !groupBoundingRect)) {
      return;
    }

    const { x, y, width, height } = this.node.getBoundingClientRect();

    const midPointPosition = { x: x + width / 2, y: y + height / 2 };

    let pointerX = 0;
    let pointerY = 0;

    if (pointerPosition) {
      pointerX = pointerPosition.x || 0;
      pointerY = pointerPosition.y || 0;
    } else if (groupBoundingRect) {
      // Magic numbers estimated from the source svg.
      pointerX = ((groupBoundingRect.right || 0) + 15) * width / 7.2;
      pointerY = ((groupBoundingRect.top || 0) + 5) * height / 7.2;
    }

    this.setState({
      rotation:
        Math.atan2(
          pointerY - midPointPosition.y,
          pointerX - midPointPosition.x,
        ) *
        180 /
        Math.PI,
    });
  }

  componentDidMount() {
    this.updateRotation(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateRotation(nextProps);
  }

  render() {
    const { radius, x, y } = this.props;
    const { rotation } = this.state;
    const diameter = 2 * radius;

    return (
      <g
        ref={node => {
          this.node = node;
        }}
        className="LogoParticle"
        transform={`rotate(${rotation}, ${x}, ${y})`}
      >
        <path
          className="LogoParticle__top-semicircle"
          d={`M${x},${y - radius} a1,1 0 0,0 0,${diameter}`}
        />
        <path
          className="LogoParticle__bottom-semicircle"
          d={`M${x},${y + radius} a1,1 0 0,0 0,${-diameter}`}
        />
      </g>
    );
  }
}

export default LogoParticle;
