import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  Platform,
  TouchableOpacity
} from 'react-native';


import { connect } from 'react-redux';

import { calculatePortraitDimension } from '../../helpers';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import BottomSheet from './components/BottomSheet';
import { BackgroundView } from '../../components';

const { height : deviceHeight } = calculatePortraitDimension();

class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  getSettingsButton = () => {
    return <View style={{ position:'absolute', top: 16, right: 16, alignItems: 'center', justifyContent:'center'}}>
      <TouchableOpacity>
        <Image style={{width: 48, height: 48}} source={require('../../../assets/images/settings.png')}>

        </Image>
      </TouchableOpacity>
    </View>
  }

  render() {
    const { user } = this.props.auth;
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <BackgroundView source={{uri: user.bigImageUrl}}/>
          {this.getSettingsButton()}
          <BottomSheet
            user={user}
          />
        
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight(true) : 0,
  },
  background:{
    flex: 1,
    backgroundColor:'black'
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
  },
  settingsButton: {
    width: 48,
    height: 48,

  }
});

const mapStateToProps = (state) => ({ app: state.app, auth: state.auth });

export default connect(mapStateToProps)(Profile);