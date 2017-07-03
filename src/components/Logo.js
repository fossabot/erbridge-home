import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import LogoParticle from './LogoParticle';

import './Logo.css';

// Magic numbers derived from the source svg.
const VIEW_BOX_WIDTH = 368;
const PARTICLE_RADIUS = 12;
const PARTICLE_DIAMETER = 2 * PARTICLE_RADIUS;
const PARTICLE_SEPARATION = 10.3;
const HEXAGON_RADIUS_RATIO = 3 / (2 * Math.sqrt(3));

class Logo extends Component {
  static propTypes = {
    className: PropTypes.string,
    focused: PropTypes.bool,
    pointerPosition: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  };

  state = {
    particleGroupBoundingRect: null,
    particleGroupScale: 1,
    particleGroupTranslate: 0,
  };

  saveParticleGroupBoundingRect = () => {
    if (!this.particleGroupNode) {
      return;
    }

    this.setState({
      particleGroupBoundingRect: this.particleGroupNode.getBoundingClientRect(),
    });
  };

  animateParticleGroupFocus(shouldFocus) {
    const { particleGroupScale, particleGroupTranslate } = this.state;

    this.cancelParticleGroupFocus();

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
        particleGroupScale:
          particleGroupScale + (scaleTarget - particleGroupScale) * t,
        particleGroupTranslate:
          particleGroupTranslate +
            (translateTarget - particleGroupTranslate) * t,
      });

      if (t === 1) {
        return;
      }

      this.particleGroupFocusAnimFrame = window.requestAnimationFrame(() => {
        runAnimation(now);
      });
    };

    runAnimation();
  }

  cancelParticleGroupFocus() {
    if (this.particleGroupFocusAnimFrame) {
      window.cancelAnimationFrame(this.particleGroupFocusAnimFrame);
    }
  }

  componentDidMount() {
    const { focused } = this.props;

    this.saveParticleGroupBoundingRect();
    window.addEventListener('resize', this.saveParticleGroupBoundingRect);

    if (focused) {
      this.animateParticleGroupFocus(focused);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.focused !== this.props.focused) {
      this.animateParticleGroupFocus(nextProps.focused);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.saveParticleGroupBoundingRect);

    this.cancelParticleGroupFocus();
  }

  render() {
    const { className, focused, pointerPosition } = this.props;
    const {
      particleGroupBoundingRect,
      particleGroupScale,
      particleGroupTranslate,
    } = this.state;

    const particleGroupTransform = [
      `translate(${VIEW_BOX_WIDTH})`,
      `scale(${particleGroupScale})`,
      `translate(${-VIEW_BOX_WIDTH + particleGroupTranslate})`,
    ].join(' ');

    return (
      <svg
        className={classnames(className, 'Logo')}
        viewBox={`0 0 ${VIEW_BOX_WIDTH} 257`}
      >
        <g
          className={classnames('Logo__text', {
            'Logo__text--hidden': focused,
          })}
        >
          <path d="M41.2,198.7c0,8.5-4.7,8.7-9.6,8.7H7v4.2c0,8.8,6.9,14.3,16.6,14.3c8.7,0,10.7-4.4,13.1-4.4c1.8,0,3,2.1,3,3.4c0,2.6-6.1,7.3-16.3,7.3C9.6,232.3,0,223.9,0,211.4V199c0-11,9.3-20.3,20.8-20.3C31.7,178.8,41.2,187.1,41.2,198.7zM28.7,202.5c4.4,0,5.5-0.7,5.5-3.8c0-7-5.5-13.9-13.6-13.9c-7.6,0-13.6,6-13.6,13.4v4.3H28.7z" />
          <path d="M73.6,185.5c-7.3,0-14.6,6-14.6,16v27.2c0,1.4-1.5,2.9-3.6,2.9c-2,0-3.4-1.4-3.4-2.9v-46.5c0-1.5,1.6-2.6,3.6-2.6c1.9,0,3.4,1.1,3.4,2.6v5.4c2-4.4,7.5-9,14.6-9h3.9c1.5,0,2.9,1.7,2.9,3.5c0,1.8-1.3,3.5-2.9,3.5H73.6z" />
          <path d="M96,150.2v37c2-4.3,7.2-8.4,14.5-8.4c10.8,0,19.5,9.2,19.5,20.6v12c0,10.9-9.4,20.9-19.7,20.9c-6.8,0-12.3-4-15.3-8.5v4.8c0,1.4-1.6,2.9-3.4,2.9c-2,0-3.6-1.4-3.6-2.9v-78.4c0-1.5,2-2.6,3.9-2.6C94,147.6,96,148.7,96,150.2zM123,199.4c0-7-6.1-14-13.7-14c-6.6,0-13.3,5.2-13.3,14v15.4c0,3.3,5.7,10.9,13.4,10.9c7.4,0,13.6-7,13.6-14.3V199.4z" />
          <path d="M163.3,185.5c-7.3,0-14.3,6-14.3,16v27.2c0,1.4-1.5,2.9-3.6,2.9c-2,0-3.4-1.4-3.4-2.9v-46.5c0-1.5,1.6-2.6,3.6-2.6c1.9,0,3.4,1.1,3.4,2.6v5.4c2-4.4,7.1-9,14.3-9h3.9c1.5,0,2.9,1.7,2.9,3.5c0,1.8-1.3,3.5-2.9,3.5H163.3z" />
          <path d="M186.3,159.4c0,2.4-2.1,4.6-4.7,4.6c-2.7,0-4.9-2.2-4.9-4.6s2.2-4.5,4.9-4.5C184.2,154.9,186.3,157,186.3,159.4zM185,182.1v46.5c0,1.4-1.6,2.9-3.6,2.9c-2,0-3.4-1.4-3.4-2.9v-46.5c0-1.5,1.5-2.6,3.4-2.6C183.4,179.5,185,180.6,185,182.1z" />
          <path d="M238,150.2v78.4c0,1.4-1,2.9-3,2.9c-1.9,0-3-1.4-3-2.9v-4.8c-3,4.5-8.5,8.5-15.3,8.5c-10.4,0-19.7-10-19.7-20.9v-12c0-11.3,8.8-20.6,19.6-20.6c7.3,0,12.4,4.1,14.4,8.4v-37c0-1.5,1.6-2.6,3.7-2.6C236.6,147.6,238,148.7,238,150.2zM204,211.4c0,7.3,6.2,14.3,13.6,14.3c7.7,0,13.4-7.6,13.4-10.9v-15.4c0-8.8-6.7-14-13.3-14c-7.6,0-13.7,6.9-13.7,14V211.4z" />
          <path d="M261.2,217.4c-1.7,0.9-3.4,2-3.4,4.3c0,9.9,34.2-0.3,34.2,19.7c0,10.3-9,15.6-21.6,15.6c-12.9,0-22.3-5.5-22.3-14.6c0-6.4,4.6-10.1,9.3-12c-3.5-1.2-6-3.2-6-7.6c0-4.1,2.3-6.2,5.6-7.9c-3.9-3.2-6-8.1-6-13.9v-4.2c0-10.6,7.4-18,18.8-18c5.2,0,9.6,1.8,12.8,4.6c2.2-4.4,5.3-6.9,7.8-6.9c2.2,0,3.3,1.5,3.3,2.9c0,1.3-0.9,2.2-1.9,2.4c-1.8,0.3-4.1,1.3-6.1,4.7c2.1,2.7,3.2,6.5,3.2,10.3v4.2c0,10.4-8,18.3-19.2,18.3C266.7,219.3,263.7,218.6,261.2,217.4zM264.8,231.9c-5.2,1.6-9.8,4.5-9.8,9.8c0,5.9,5.8,10,15.3,10c9.2,0,14.7-4,14.7-10.1C285,232.5,271.7,232.9,264.8,231.9zM282,196.8c0-7.1-4.4-12.6-12-12.6c-7.6,0-12,5.5-12,12.6v4.1c0,7.4,4.5,13,12.1,13c7.4,0,11.9-5.5,11.9-12.9V196.8z" />
          <path d="M341.6,198.7c0,8.5-4.7,8.7-9.6,8.7h-25v4.2c0,8.8,7.1,14.3,16.8,14.3c8.7,0,10.8-4.4,13.2-4.4c1.8,0,3.1,2.1,3.1,3.4c0,2.6-6.3,7.3-16.5,7.3c-13.9,0-23.6-8.4-23.6-20.9V199c0-11,9.5-20.3,21-20.3C331.9,178.8,341.6,187.1,341.6,198.7zM329.1,202.5c4.4,0,5.5-0.7,5.5-3.8c0-7-5.7-13.9-13.8-13.9c-7.6,0-13.8,6-13.8,13.4v4.3 H329.1z" />
        </g>
        <g
          ref={node => {
            this.particleGroupNode = node;
          }}
          className="Logo__particles"
          transform={particleGroupTransform}
        >
          {[Array(3), Array(4), Array(5), Array(4), Array(3)].map((arr, i) =>
            arr
              .fill(1)
              .map((_, j) => ({
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
                  groupBoundingRect={particleGroupBoundingRect}
                  pointerPosition={pointerPosition}
                  radius={PARTICLE_RADIUS}
                  x={x}
                  y={y}
                />,
              ),
          )}
        </g>
      </svg>
    );
  }
}

export default Logo;
