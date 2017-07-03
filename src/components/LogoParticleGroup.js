import PropTypes from 'prop-types';
import React, { Component } from 'react';

import LogoParticle from './LogoParticle';

// Magic numbers derived from the source svg.
const PARTICLE_RADIUS = 12;
const PARTICLE_DIAMETER = 2 * PARTICLE_RADIUS;
const PARTICLE_SEPARATION = 10.3;
const HEXAGON_RADIUS_RATIO = 3 / (2 * Math.sqrt(3));

class LogoParticleGroup extends Component {
  static propTypes = {
    focused: PropTypes.bool,
    pointerPosition: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    viewBox: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
  };

  state = {
    boundingRect: null,
    scale: 1,
    translate: 0,
  };

  saveBoundingRect = () => {
    if (!this.node) {
      return;
    }

    this.setState({ boundingRect: this.node.getBoundingClientRect() });
  };

  animateFocus(shouldFocus) {
    const { scale, translate } = this.state;

    this.cancelFocus();

    const duration = 250;
    const endTime = Date.now() + duration;

    // FIXME: Derive this from the viewBox height.
    const scaleTarget = shouldFocus ? 1.59 : 1;

    // FIXME: Derive this from the particle group width (in svg space).
    const translateTarget = shouldFocus ? -47 : 0;

    const runAnimation = () => {
      const now = Date.now();

      // Linear to match the text fade.
      const t = Math.min(1, 1 - (endTime - now) / duration);

      // Use the current state's value as the start to match css transitions.
      this.setState({
        scale: scale + (scaleTarget - scale) * t,
        translate: translate + (translateTarget - translate) * t,
      });

      if (t === 1) {
        return;
      }

      this.focusAnimFrame = window.requestAnimationFrame(() => {
        runAnimation(now);
      });
    };

    runAnimation();
  }

  cancelFocus() {
    if (this.focusAnimFrame) {
      window.cancelAnimationFrame(this.focusAnimFrame);
    }
  }

  componentDidMount() {
    const { focused } = this.props;

    this.saveBoundingRect();
    window.addEventListener('resize', this.saveBoundingRect);

    if (focused) {
      // FIXME: Should this jump into focus in this case,
      //        by just setting the state?
      this.animateFocus(focused);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.focused !== this.props.focused) {
      this.animateFocus(nextProps.focused);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.saveBoundingRect);

    this.cancelFocus();
  }

  render() {
    const { pointerPosition, viewBox } = this.props;
    const { boundingRect, scale, translate } = this.state;

    return (
      <g
        ref={node => {
          this.node = node;
        }}
        className="LogoParticleGroup"
        transform={[
          `translate(${viewBox.width})`,
          `scale(${scale})`,
          `translate(${-viewBox.width + translate})`,
        ].join(' ')}
      >
        {[Array(3), Array(4), Array(5), Array(4), Array(3)].map((arr, i) =>
          arr
            .fill(1)
            .map((_, j) => ({
              // FIXME: Refactor these values into the parent, instead.
              // Magic numbers derived from the source svg.
              x:
                266.1 +
                  (i - 1) *
                    (PARTICLE_DIAMETER + PARTICLE_SEPARATION) *
                    HEXAGON_RADIUS_RATIO,
              y:
                41.2 -
                  PARTICLE_RADIUS +
                  (j + 0.5 * (4 - arr.length)) *
                    (PARTICLE_DIAMETER + PARTICLE_SEPARATION),
            }))
            .map(({ x, y }, j) =>
              <LogoParticle
                key={100 * i + j}
                groupBoundingRect={boundingRect}
                pointerPosition={pointerPosition}
                radius={PARTICLE_RADIUS}
                x={x}
                y={y}
              />,
            ),
        )}
      </g>
    );
  }
}

export default LogoParticleGroup;
