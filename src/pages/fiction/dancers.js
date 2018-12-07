import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './dancers.scss';

export class PoemWithSquare extends Component {
  static propTypes = {
    normalLines: PropTypes.arrayOf(PropTypes.string).isRequired,
    squareLines: PropTypes.arrayOf(PropTypes.string).isRequired,
    squareStartCharacter: PropTypes.number.isRequired,
    squareStartLine: PropTypes.number.isRequired,
  };

  render() {
    const {
      normalLines,
      squareLines,
      squareStartCharacter,
      squareStartLine,
    } = this.props;

    const topLines = normalLines.slice(0, squareStartLine);
    const middleLines = normalLines.slice(
      squareStartLine,
      squareStartLine + squareLines.length,
    );
    const bottomLines = normalLines.slice(squareStartLine + squareLines.length);

    const fontSize = 18;
    const lineHeight = fontSize * 1.5;

    return (
      <div className="PoemWithSquare">
        {topLines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div className="PoemWithSquare__square-container">
          <div className="PoemWithSquare__before-square">
            {middleLines.map((line, i) => (
              <div key={i}>{line.substr(0, squareStartCharacter)}</div>
            ))}
          </div>
          <div
            className="PoemWithSquare__square"
            style={{ width: squareLines.length * lineHeight }}
          >
            {squareLines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          <div className="PoemWithSquare__after-square">
            {middleLines.map((line, i) => (
              <div key={i}>{line.substr(squareStartCharacter)}</div>
            ))}
          </div>
        </div>
        {bottomLines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    );
  }
}
