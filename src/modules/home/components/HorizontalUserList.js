import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';


import { connect } from 'react-redux';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { colors } from '../../../styles';
import { ImageView } from '../../../components';
class HorizontalUserList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //TODO if recods count saved on server pull it and show in the list

  }


  onUserPressed = (item) => {
    console.log("user pressed", item);
  }


  onRefresh = () => {

  }

  getUserItem = (item) => {
      const {smallImageUrl} = item;
      return <TouchableOpacity
        style={{flex:1}}
        onPress={()=>{
          this.onUserPressed(item);
        }}
      >
      <View style={{margin:16, width:72, height: 72,borderRadius:36, borderWidth: 1, borderColor:'#2b2b2b', justifyContent: 'center', alignItems:'center'}}>
        <ImageView style={styles.profileImage} source= {{uri: item.smallImageUrl}}/>
      </View>
      </TouchableOpacity>
       
  }

  renderItem = ({ item }) => {
    return this.getUserItem(item);
  }


  renderHorizonalUsers = () => {
    
    const { users } = this.props;

    return (<FlatList
      data={users.newUsers} renderItem={this.renderItem}
      ListFooterComponent={this.renderFooterComponent()}
      refreshing={false}
      keyExtractor={(item, index) => index.toString()}
      onRefresh={this.onRefresh}
      horizontal = {true}
    />);
  }

  renderFooterComponent() {
    if (this.props.isLoading && !this.props.isRefreshing) {
      return <View style={styles.footer}><ActivityIndicator size="small" color="white" /></View>;
    }
  }

  renderEmptyView = () => {
    if (this.props.isLoading) {
      return null;
    }
    let text = '';
    if (!this.props.hasError) {
      text = 'No medical records have been found ';
    } else {
      text = 'An error occured please retry';
    }
    return <View style={styles.emptyView}><Text style={styles.emptyText}>{text}</Text></View>;
  }

  render() {
    return (

        <View style={styles.container}>
          {this.renderHorizonalUsers()}
        </View>
        
    );
  }

}

const styles = StyleSheet.create({

  container: {
    height: 108,
    borderBottomWidth : 0.5,
    borderBottomColor: 'grey'
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  row:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 16,
    marginEnd: 16,
  },
  separator: {
    
    height: 0.5,
    marginLeft: 64,
    backgroundColor: colors.lightGray2
  },
  emptyText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  headerView: {
    flex: 1,
    marginStart: 16,
    marginEnd: 16,
  },
  emptyView: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 16,
    marginEnd: 16,
  },
  name: {
    fontSize: 17,
    color: 'black',
  },
  text: {
    fontSize: 14,
    color: colors.gray,
  },
  profileImage: {
    borderRadius: 30,
    height: 60,
    width: 60
  }
});



const mapStateToProps = (state) => ({ app: state.app, auth: state.auth, users: state.users });

export default connect(mapStateToProps)(HorizontalUserList);