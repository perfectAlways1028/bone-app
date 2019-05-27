import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity
} from 'react-native';

import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { ImageView } from '../../components';
import { colors } from '../../styles';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class PhotoModal extends React.Component {
    constructor(props) {
      super(props); 
      this.state={
          source: this.props.navigation.getParam('source'),
          shortUrl: this.props.navigation.getParam('shortUrl')
      }
    }

    getCloseButton = () => {
        return <TouchableOpacity 
        style={{width: 40, height: 40, top:16, right: 16, 
                justifyContent:'center', alignItems:'center'}}
        onPress={()=>{

        }}>
            <Icon name={'close'} color={this.props.color} size={30} />
        </TouchableOpacity>
    }
    render() {
        return (
            <View style={styles.background}>
                <View style={styles.container}>
                  {this.getCloseButton()}
                  <ImageView
                    source={this.state.source}
                    shortUrl={this.state.shortUrl}
                  />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.transparentBlack
    },
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? getStatusBarHeight(true) : 0,
        marginBottom: getBottomSpace()
    },



});

