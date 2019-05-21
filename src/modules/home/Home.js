import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';


import { connect } from 'react-redux';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { getNearByUsers, getWatchList, getNewUsers } from './actions/UserActions';
import UsersGrid from './components/UsersGrid'
import HorizontalUserList from './components/HorizontalUserList'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      searchon: false,
      locationon: false,
      eyeon: false,
      filteron: false,
      onlineBit: 0,
      gridType: 'nearby' // nearby, watchlist, filter
    }
  }

  componentDidMount() {
    this.loadUsers();
  }
  
  loadUsers = () => {

    if(this.state.gridType == 'nearby') {
      this.fetchNearByUsers();
    }
    this.fetchNewUsers();

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

  getTopToolBar = (searchon, locationon, eyeon, filteron ) => {
    return <View style={styles.topToolbarContainer}>
      <View style={{width:40, height:40}}>
        <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
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
          <TouchableOpacity style={{ alignItems:'center', justifyContent: 'center', width: 40, height:40}}>
            <Image style={styles.icon} source={filteron ? require('../../../assets/images/filteron.png') : require('../../../assets/images/filteroff.png')}/>
          </TouchableOpacity>
      </View>
    </View>
  }
  render() {
    
    return (
      <View style={styles.background}>
          <View style={styles.container}>
            {this.getTopToolBar()}
            <HorizontalUserList/>
            <UsersGrid/>
          </View>
       
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight(true) : 0,
    marginBottom: getBottomSpace()
  },
  background: {
    flex: 1,
    backgroundColor: 'black'
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