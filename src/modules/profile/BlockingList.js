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
import { colors } from '../../styles';
import {loadBlockUsers} from '../../actions/AuthActions';
class BlockingList extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ type: nextProps.type, showType: nextProps.showType})
  }
  componentWillMount() {
    //TODO if recods count saved on server pull it and show in the list
    this.props.dispatch(loadBlockUsers(this.props.auth.user.id));
  }


  onUnBlock = (item) => {
    console.log("unblock user pressed", item);
  }


  onRefresh = () => {
    if(this.props.onRefresh) {
      this.props.onRefresh();
    }
  }

  getUserItem = (item) => {
    return <View style={styles.itemContainer}>

    </View>
       
  }

  renderItem = ({ item }) => {
    return this.getUserItem(item);
  }

  renderUsers = () => {
    const { auth } = this.props;
    return (
      <FlatList
        data={auth.blocklist} renderItem={this.renderItem}
        ListFooterComponent={this.renderFooterComponent()}
        refreshing={false}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={this.onRefresh} 
      />
    );
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

        <View style={this.state.type == 'search'? 
                        this.state.showType == 'grid' ? styles.gridContainer 
                                                      : styles.searchContainer 
                        : styles.container}>
          {this.renderUsers()}
        </View>
        
    );
  }

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor:'black'
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemContainer:
  {
    alignSelf:'stretch',
    height: 108,
    marginStart: 16,
    marginEnd: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'white'
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



const mapStateToProps = (state) => ({ app: state.app, auth: state.auth });

export default connect(mapStateToProps)(BlockingList);