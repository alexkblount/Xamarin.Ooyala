
/**
 * Created by dkao on 9/4/15.
 */
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

var styles = require('../utils').getStyles(require('./style/CircularStatus.json'));

class CircularStatus extends React.Component {
  static propTypes = {
    current: PropTypes.number,
    total: PropTypes.number,
    diameter: PropTypes.number,
    thickness: PropTypes.number,
    onPress: PropTypes.func,
  };

  renderCircularStatus = () => {

    var edges = this.props.diameter;
    var segment_length = (this.props.diameter * Math.PI * 1.1) / edges;
    var circleSegments = [];
    var segmentangle = (-360/edges) * (Math.PI/180);
    var radius = this.props.diameter/2;
    var progress = (this.props.current / this.props.total) * edges;

    for(var i = 0; i < edges; i++) {
      var radians = i * segmentangle + (Math.PI/2);
      var color = (progress < i) ? "gray" : "white" ;
      circleSegments.push(
        (<View style={{
          "position": "absolute",
          "top": (-Math.sin(radians)*radius) + radius,
          "left": (-Math.cos(radians)*radius) + radius,
          "height": this.props.thickness,
          "width": segment_length,
          "backgroundColor": color,
          "transform": [{
            "rotate": radians + (Math.PI/2) + "rad"
          }]
        }}></View>)
      );
    }

    return (<View style={{
      "height": this.props.diameter,
      "width": this.props.diameter
    }}>
      {circleSegments}
      {<Text style={{
        "color": "white",
        "position":"absolute",
        "top": this.props.diameter/4,
        "right": this.props.diameter/4,
        "fontSize": this.props.diameter/2
      }}>
        {Math.floor(this.props.current)}
      </Text>}
    </View>);
  };

  renderClickableCircularStatus = () => {
    return (<TouchableHighlight
      underlayColor='transparent'
      onPress={() => this.props.onPress()}>
      {this.renderCircularStatus()}
    </TouchableHighlight>);
  };

  render() {
    if (this.props.onPress) {
    return this.renderClickableCircularStatus();
    } else {
      return this.renderCircularStatus();
    }
  }
}

module.exports = CircularStatus;
