import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Image
} from 'react-native';


import { connect } from 'react-redux';

import { calculatePortraitDimension } from '../../helpers';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import BottomSheet from './components/BottomSheet';
const { height : deviceHeight } = calculatePortraitDimension();

class Profile extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {
 
    return (
      <View style={styles.container}>
        <Text>Hello world</Text>
        <BottomSheet/>
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  text: {
    fontSize: 14,
    color: 'white'
  },

  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  panelHeader: {
    height: 120,
    backgroundColor: '#b197fc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  }
});

const mapStateToProps = (state) => ({ app: state.app });

export default connect(mapStateToProps)(Profile);