import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Platform,
  TouchableOpacity,
  ScrollView
} from 'react-native';


import { connect } from 'react-redux';

import { calculatePortraitDimension } from '../../helpers';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { TopNavigatorView, LoadingOverlay, PhotoPickerView } from '../../components';
import ListItem from './components/ListItem';
import SectionTitleItem from './components/SectionTitleItem';
import ListItemSwitch from './components/ListItemSwitch';
import NumberPickerListItem from './components/NumberPickerListItem';
import ItemPickerListItem from './components/ItemPickerListItem';

import { uploadProfileImage } from '../../actions/AuthActions'
import { colors } from '../../styles';


const { height : deviceHeight, width: deviceWidth } = calculatePortraitDimension();

class ProfileEdit extends React.Component {
    constructor(props) {
      super(props);
      let user = props.navigation.getParam('user');
      this.state = {
        ...user  
      }
    }

    componentWillReceiveProps(nextProps) {
      
    } 

    onSave = () => {

    }

    getSaveButton = () => {
      return <TouchableOpacity 
      onPress={()=>{
        this.onSave();
      }}>
        <View style={{paddingRight: 16, height: 50, justifyContent:'center', alignItems:'center'}} >
           <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold'}}>Save</Text>
        </View>
     
      </TouchableOpacity>
    }
    getTopNavigator = () => {
      return <TopNavigatorView
        title={'Profile Edit'}
        onBackPressed = {() => {
          this.props.navigation.goBack();
        }}

        rightComponent = { this.getSaveButton()}
      />
    }


    onUpdateImage = (userId, image) => {
      this.props.dispatch(uploadProfileImage(userId, image));
    } 
    render() {
        const { user } = this.props.auth;
        const { username, age, about, height, weight, role } = this.state;
        const { modifiables } = this.props.app;
        return (
            <View style={styles.background}>
              <LoadingOverlay visible={this.props.auth.isLoading}/>
              <View style={styles.container}>
              {this.getTopNavigator()}
              <ScrollView contentContainerStyle={{flex:1}}>
                  <PhotoPickerView
                    imageUrl= {user.bigImageUrl}
                    updateImage={(image)=>{this.onUpdateImage(user.id,image)}}
                  />
                  <SectionTitleItem
                    itemContainerStyle={{marignTop:32}}
                    title={'INFO'}
                  />
                  <ListItem
                    title={'Display Name'}
                    rightIconImage={require('../../../assets/images/forward.png')}
                    text={username}
                    onItemPress={()=>{
                      this.props.navigation.navigate("TextInputView", { title: 'Display Name', value: username, inputType:'textinput', returnData: (value) => {
                        this.setState({username: value});
                      }})
                    }}
                  />
                  <ListItem
                    title={'About'}
                    rightIconImage={require('../../../assets/images/forward.png')}
                    onItemPress={()=>{
                      this.props.navigation.navigate("TextInputView", { title: 'About',value: about, inputType: 'textarea', returnData: (value) => {
                        this.setState({about: value});
                      }})
                    }}
                  />

                  <SectionTitleItem
                    itemContainerStyle={{marignTop:32}}
                    title={'STATS'}
                  />
                  <NumberPickerListItem
                    title={'Age'}
                    max={120}
                    min={18}
                    value={age}
                    onPickNumber={(value)=>{
                      this.setState({age: value})
                    }}
                  />
                  <ListItemSwitch
                    title={'Show Age'}
                    rightIconImageOn={require('../../../assets/images/boneoncb.png')}
                    rightIconImageOff={require('../../../assets/images/boneoffcb.png')}
                    value={this.state.showAge}
                    onChangeState={(value)=>{
                      this.setState({showAge: value})
                    }}
                  />
                  <NumberPickerListItem
                    title={'Height'}
                    max={250}
                    min={100}
                    value={height}
                    onPickNumber={(value)=>{
                      this.setState({height: value})
                    }}
                  />
                  <NumberPickerListItem
                    title={'Weight'}
                    max={300}
                    min={40}
                    value={weight}
                    onPickNumber={(value)=>{
                      this.setState({height: value})
                    }}
                  />
                  <ItemPickerListItem
                    title={'Role'}
                    value={role.name}
                    items={modifiables.roles}
                    onPickItem={(item)=> {
                      this.setState({role: item})
                    }}
                  />
 
             
              </ScrollView>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        backgroundColor: 'black'
    },
    container: {
        flex: 1,
        marginBottom: getBottomSpace(),
        marginTop: Platform.OS === 'ios' ? getStatusBarHeight(true) : 0,
    },

});

const mapStateToProps = (state) => ({ app: state.app, auth: state.auth, gallery: state.gallery });

export default connect(mapStateToProps)(ProfileEdit);