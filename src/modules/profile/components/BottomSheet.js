import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Image
} from 'react-native';


import { connect } from 'react-redux';
import SlidingUpPanel from 'rn-sliding-up-panel'

import { calculatePortraitDimension } from '../../../helpers';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import StarRating from 'react-native-star-rating';
import { colors } from '../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { height : deviceHeight } = calculatePortraitDimension();

class Profile extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        draggableRange: {
        top: deviceHeight  - getStatusBarHeight(),
        bottom: 120
        }
    }

     _draggedValue = new Animated.Value(120)
    getOnlineStyle = (onlineStatus) => {
        return styles.online;
    }
    getPanelHeaderView = (onlineStatus, name, rating) => {
        return <View style={styles.panelHeader}>
            <View style={styles.panelHeaderHandleContainer}>
                <View style={styles.panelHeaderHandle}/>
            </View>

            <View style={{flex: 1, backgroundColor:'black', flexDirection: 'row', alignItems:'flex-start'}}>
                <View style={{flex: 1, flexDirection:'column', alignItems:'flex-start', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', alignItems:'center', marginTop: 8}}>
                        <View style={[styles.statusMark, this.getOnlineStyle(onlineStatus), {marginLeft:8}]}/>
                        <Text style={[styles.text, {marginLeft: 16}]}>{name}</Text>
                    </View>
                    <View style={{marginLeft: 32, marginBottom:16, marginTop:16}}>
                        <StarRating
                            
                            disabled={true}
                            maxStars={5}
                            emptyStar="ios-star-outline"
                            fullStar="ios-star"
                            halfStar="ios-star-half"
                            iconSet="Ionicons"
                            fullStarColor="red"
                            starPadding={4}
                            rating={rating}
                            starSize={16}
                        />
                    </View>
                </View>

                <View style={{flexDirection:'row', width: 91, height:90, alignItems:'center'}}>
                    <View style={{width: 1, height: 48, backgroundColor: colors.darkGray}}/>
                    <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity>
                            <Image
                                style={{width: 64 ,height: 64, padding: 8}}
                                resizeMethod='contain'
                                source={require('../../../../assets/images/edit.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        </View>
    }

  render() {
    const {top, bottom} = this.props.draggableRange

    const draggedValue = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    const transform = [{scale: draggedValue}]


    return (
        <SlidingUpPanel
          showBackdrop={true}
          ref={c => (this._panel = c)}
          snappingPoints={[0,deviceHeight- getStatusBarHeight()]}
          draggableRange={this.props.draggableRange}
          animatedValue={this._draggedValue}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              {this.getPanelHeaderView('online', 'Ding', 4)}
              <Text style={{color: '#FFF'}}>Bottom Sheet Peek</Text>
            </View>
            <View style={styles.container}>
              <Text>Bottom Sheet Content</Text>
            </View>
          </View>

        </SlidingUpPanel>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },

  text: {
    fontSize: 17,
    color: 'white'
  },

  panel: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative'
  },
  panelHeader: {
    height: 120,
    alignSelf:'stretch'
  },
  panelHeaderHandleContainer: {
    shadowOffset:{  height: -2,  },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 16,
    alignSelf:'stretch'
  },
  panelHeaderHandle: {
    height: 8,
    width: 32,
    backgroundColor: colors.gray
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
  online: {
    backgroundColor: '#39b54a'
  },
  offline: {
    backgroundColor: '#808080'
  },
  away: {
    backgroundColor: '#f7931e'
  },
  statusMark: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  starStyle: {

  }
});

const mapStateToProps = (state) => ({ app: state.app });

export default connect(mapStateToProps)(Profile);