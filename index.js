import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Canvas from 'react-native-canvas';
import { generateCircles, calcPositions, drawCirclesOnCanvas } from './utils';

class KeywordsCloud extends React.Component {

  selectTab = tabName => () => {
    this.setState({ selectedTab: tabName });
  }

  handleCanvas = (canvas) => {
    const { keywords,scale, largestAtCenter, drawContainerCircle,containerCircleColor } = this.props;
    if (canvas) {
      canvas.width = 300 
      canvas.height = 300 
      const center = { x: canvas.width / 2, y: canvas.height / 2 };
      const circles = generateCircles(
          keywords, center, scale, largestAtCenter);
      calcPositions(circles);
      drawCirclesOnCanvas(circles, canvas, drawContainerCircle, containerCircleColor);
    }
  }

  render() {
    return (
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Canvas ref={canvas => this.handleCanvas(canvas)} />
      </View>
    );
  }
}

KeywordsCloud.defaultProps = {
    scale: 250,
    largestAtCenter: true,
    drawContainerCircle: false,
    containerCircleColor: '#FF000030'
};

KeywordsCloud.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.shape(
    { keyword: PropTypes.string, frequency: PropTypes.number, color: PropTypes.string },
  )).isRequired,
  scale: PropTypes.number,
  largestAtCenter: PropTypes.bool,
  drawContainerCircle: PropTypes.bool,
  containerCircleColor: PropTypes.string
};

export default KeywordsCloud;
