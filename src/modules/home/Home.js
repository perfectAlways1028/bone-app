import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  InteractionManager
} from 'react-native';


import { connect } from 'react-redux';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import Permissions from 'react-native-permissions';
import { getNearByUsers, getWatchList, getNewUsers, setFlag, changeLocation } from '../../actions/UserActions';
import { loadUserProfile, loadMyGallery } from '../../actions/AuthActions';
import { getModifiables } from '../../actions/AppActions';
import UsersGrid from './components/UsersGrid'
import HorizontalUserList from './components/HorizontalUserList'
import UserSearchView from './components/UserSearchView'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      onlineBit: 0,
      gridType: 'nearby' // nearby, watchlist, filter
    }
  }

  componentDidMount() {
    this.loadUsers();
    this.checkLocationPermission(this.props.dispatch);
  }

  loadProfile = () => {
    const { auth, dispatch } = this.props;
    const { onlineBit } = this.state;
    if(!auth.user)
    return;
  
    dispatch(loadUserProfile(auth.user.id));
    dispatch(loadMyGallery(auth.user.id));
    dispatch(getModifiables(auth.user.id));
  }

  loadUsers = () => {
    this.loadProfile();
    
    this.fetchNearByUsers();
    
    this.fetchNewUsers();

  }

  watchLocation = () => {
    const { auth, dispatch } = this.props;
    if(!auth.user)
    return;
    navigator.geolocation.watchPosition(
      (position) => {
        const body = {
          id: auth.user.id,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        dispatch(changeLocation(body));
      },
      (error) => {
        // console.log(error);
      },
      {
        enableHighAccuracy: Platform.OS != 'android',
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }

  checkLocationPermission = (dispatch) => {
    InteractionManager.runAfterInteractions(() => {
      Permissions.checkMultiple(['location']).then((response) => {
        if (response.location === 'authorized') {
          this.watchLocation();
        } else if (response.location === 'undetermined') {
          this._requestLocationPermission(dispatch);
        }
      });
    });
  }

  _requestLocationPermission = (dispatch) => {
    Permissions.request('location', { type: 'always' }).then((response) => {
      if (response.location === 'authorized') {
        this.watchLocation();
      }
    });
  }

  updateLocation = () => {
    const { auth, dispatch } = this.props;
    if(!auth.user)
    return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const body = {
          id: auth.user.id,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        dispatch(changeLocation(body));
      },
      (error) => {
        // console.log(error);
      },
      {
        enableHighAccuracy: Platform.OS != 'android',
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }
  
  fetchNewUsers = () => {
    const { auth, dispatch } = this.props;
    const { onlineBit } = this.state;
    if(!auth.user)
    return;
    let data = {
      id: auth.user.id,
      limit : 15, 
      offset : 0,
      online: onlineBit
    }
    console.log("fetchNewUsers", data);
    dispatch(getNewUsers(data));
  }

  fetchNearByUsers = () => {
    const { auth, dispatch } = this.props;
    const { onlineBit } = this.state;
    if(!auth.user)
    return;
    console.log("currentUser",auth.user);
    let data = {
      id: auth.user.id,
      limit : 60, 
      offset : 0,
      online: onlineBit
    }
    console.log("fetchNearByUsers", data);
    dispatch(getNearByUsers(data));
  }

  onFilterPress = ()=>{
    this.props.navigation.navigate("UserFilter");
  }

  getTopToolBar = (searchon, locationon, eyeon, filteron ) => {
    return <View style={styles.topToolbarContainer}>
      <View style={{width:40, height:40}}>
        <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent: 'center'}}
          onPress={this.onSearchPress}
        >
          <Image style={styles.icon} source={searchon ? require('../../../assets/images/searchon.png') : require('../../../assets/images/searchoff.png')}/>
        </TouchableOpacity>
      </View>
      <View style={{width:40, flexDirection: 'row', alignItems:'center', justifyContent:'flex-end'}}>
          <TouchableOpacity style={{ alignItems:'center', justifyContent: 'center', width: 40, height:40}}>
            <Image style={styles.icon} source={locationon ? require('../../../assets/images/locationon.png') : require('../../../assets/images/locationoff.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems:'center', justifyContent: 'center', width: 40, height:40}}>
            <Image style={styles.icon} source={eyeon ? require('../../../assets/images/eyeon.png') : require('../../../assets/images/eyeoff.png')}/>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ alignItems:'center', justifyContent: 'center', width: 40, height:40}}
            onPress={()=>{
              this.onFilterPress();
            }}>
            <Image style={styles.icon} source={filteron ? require('../../../assets/images/filteron.png') : require('../../../assets/images/filteroff.png')}/>
          </TouchableOpacity>
      </View>
    </View>
  }

  onSearchPress = () =>{
    const { searchon } = this.props.users;
    this.props.dispatch(setFlag("searchon", !searchon));
  }
  render() {
    const { searchon, locationon, eyeon, filteron } = this.props.users;
    return (
      <View style={styles.background}>
          <View style={styles.container}>
            {this.getTopToolBar(searchon, locationon, eyeon, filteron)}
            <View style={styles.content}>

              <HorizontalUserList onRefresh={()=> {this.loadUsers()}}/>
              <UsersGrid onRefresh={()=> {this.loadUsers()}}/>
              {
                searchon &&
                <UserSearchView/>
              }
            </View>
            
          </View>
       
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight(true) : 0,
  },
  background: {
    flex: 1,
    backgroundColor: 'black'
  },
  content: {
    flex: 1
  },
  text: {
    fontSize: 14,
    color: 'white'
  },
  topToolbarContainer: {
    height: 40,
    alignSelf: 'stretch',
    borderBottomColor: '#2b2b2b',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  }
});

const mapStateToProps = (state) => ({ app: state.app, auth: state.auth, users: state.users });

export default connect(mapStateToProps)(Home);