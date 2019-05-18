import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

class BackgroundView extends Component {
  render = () => {
    return (
        <ImageBackground
          style={styles.background}
          source={require('../../assets/images/splash.jpg')}
          resizeMode='cover'
        />

    );
  };
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

const mapStateToProps = (state) => {
  const { app } = state;

  return { app };
};

export default connect(mapStateToProps)(BackgroundView);
