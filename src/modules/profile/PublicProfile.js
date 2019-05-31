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
import { ImageView, TopNavigatorView } from '../../components';
import { loadUserProfile, blockUser,unblockUser,boneUser,unboneUser, watchUser,unwatchUser } from '../../actions/PublicUserActions'; 

const { height : deviceHeight } = calculatePortraitDimension();

class PublicProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state={
        userId: this.props.navigation.getParam('userId'),
        user: {},
        gallery: []
    }

    
  }
  componentDidMount() {
    this.props.dispatch(loadUserProfile(this.props.auth.user.id, this.state.userId))
  }
  onEyePress = (isWatching) => {
    if(isWatching)
        this.props.dispatch(unwatchUser(this.props.auth.user.id, this.state.userId))
    else
        this.props.dispatch(watchUser(this.props.auth.user.id, this.state.userId))
  }
  onBlockPress = (isBlocking) => {
    if(isBlocking) {
        this.props.dispatch(blockUser(this.props.auth.user.id, this.state.userId)) 
    }
    else {
        //show block dialog
    }
  }
  onBonePress = (isBoning) => {
    if(isBoning) {
        this.props.dispatch(unboneUser(this.props.auth.user.id, this.state.userId))
    }else {
        this.props.dispatch(boneUser(this.props.auth.user.id, this.state.userId))
    }
  }
  onChatPress = () => {

  }
  onReportProfile = () => {
    //show report dialog
  }
  getRightComponent = (isBlocking, isWatching) => {
    return <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
          <TouchableOpacity 
            style={{ alignItems:'center', justifyContent: 'center', width: 40, height:40, marginRight: 36}}
            onPress={()=>{
              this.onBlockPress(isBlocking);
            }}>
            <Image style={styles.icon} source={require('../../../assets/images/block.png')}/>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ alignItems:'center', justifyContent: 'center', width: 40, height:40, marginRight: 16}}
            onPress={()=>{
              this.onEyePress(isWatching);
            }}>
            <Image style={styles.icon} source={isWatching ? require('../../../assets/images/eyeon.png') : require('../../../assets/images/eyeoff.png')}/>
          </TouchableOpacity>
    </View>
  }

  getFloatButtons = () => {
      return <View style={{position:'absolute', right: 16, bottom: 120, flexDirection: 'column', 
                           height: 180, width: 60, 
                           justifyContent:'space-between', alignItems:'center' }}>
          <TouchableOpacity 
            style={{ alignItems:'center', justifyContent: 'center', width: 60, height:60}}
            onPress={()=>{
              this.onReportProfile();
            }}>
            <Image style={{width:60, height:60}} source={require('../../../assets/images/report_profile.png') }/>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ alignItems:'center', justifyContent: 'center', width: 60, height:60}}
            onPress={()=>{
              this.onChatPress();
            }}>
            <Image style={{width:60, height:60}} source={ require('../../../assets/images/chatprofile.png') }/>
          </TouchableOpacity>

      </View>
  }
  getTopNavigator = (isBlocking, isWatching) => {
    return <TopNavigatorView
      containerStyle={{marginTop:16}}
      title={''}
      onBackPressed = {() => {
        this.props.navigation.goBack();
      }}
      rightComponent={this.getRightComponent(isBlocking, isWatching)}
    />
  }
  getContent = (user, gallery) =>{
      let isBlocking = user.userToUser ? user.userToUser.isBlocking : false;
      let isWatching = user.userToUser ? user.userToUser.isWatching : false;

    return <View style={styles.container}>

        <TouchableOpacity 
            activeOpacity={1}
            style={{position:'absolute', left:0, right:0, top:0, bottom:0}} 
            onPress = {()=>{
            this.props.navigation.navigate("PhotoModal", {shortUrl: user.bigImageUrl})
            }}>
        <ImageView shortUrl= {user.bigImageUrl} style={{position:'absolute', left:0, right:0, top:0, bottom:0}} resizeMode={'cover'}/>  
        </TouchableOpacity>
        {this.getTopNavigator(isBlocking, isWatching)}
        {
            this.getFloatButtons()
        }
        <BottomSheet
        user={user}
        gallery={gallery}
        isPublic={true}
        navigation={this.props.navigation}
        onBonePress={(isBoning) => {
            this.onBonePress(isBoning)
        }}
        />

  
    </View>
  }

  render() {
    const { user } = this.props.publicUser;
    return (
      <View style={styles.background}>
        {
            user &&
            this.getContent(user, user.userPhotos)        
        }   

      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  icon: {
    width: 40,
    height: 40
  },
  settingsButton: {
    width: 48,
    height: 48,

  }
});

const mapStateToProps = (state) => ({ app: state.app, auth: state.auth, publicUser: state.publicUser });

export default connect(mapStateToProps)(PublicProfile);