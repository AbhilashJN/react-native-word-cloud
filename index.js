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
    keywords: [
        {keyword:'word1', frequency:100, color:'#7F73C4'},
        {keyword:'word2', frequency:87,color:'#F09A98'},
        {keyword:'word3', frequency:124, color:'#9CEDC6'},
        {keyword:'word4', frequency:135, color:'#92CEED'},
        {keyword:'word5', frequency:163, color:'#F6CA9C'},
        {keyword:'word6', frequency:94, color:'#FAE59F'},
        {keyword:'word7', frequency:143, color:'#D099F9'},
        {keyword:'word9', frequency:102, color:'#F09AB9'},
        {keyword:'word9', frequency:118, color:'#9AADF9'},
        {keyword:'word10', frequency:64, color:'#B8FCA0'},
    ],
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
