import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Image,
  Text,
  ImageBackground
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Button, BackgroundView, IconizedTextInput } from '../../components'; 
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { calculatePortraitDimension, showToast } from '../../helpers'
import Icon from 'react-native-vector-icons/FontAwesome5';


const { width: deviceWidth, height: deviceHeight } = calculatePortraitDimension();

export default class Register extends React.Component {
  state= {
    robot:'Robot',
    email: '',
    password: ''
    
  }
  componentDidMount() {
  }

  getBackButton() {
      return <View style={{position:'absolute', width: 32, height:32, left: 16, alignItems:'center', justifyContent:'center', top: Platform.OS === 'ios' ? getStatusBarHeight(true) + 16 : 16}}>
        <TouchableOpacity onPress={()=>{
            this.props.navigation.goBack();
        }} >
          <Icon name="chevron-left" size={30} color="white" solid />
        </TouchableOpacity>
      </View>
  }

  getHeaderView() {
      return <View style={{flexDirection:'column'}}>
        <ImageBackground style={{height: deviceWidth*4/6, width: deviceWidth}} resizeMode='contain' source={require('../../../assets/images/bonestock.jpg')} >
          {this.getBackButton()}
        </ImageBackground>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 72, alignSelf:'stretch'}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize: 28, color:'white' }}>{"Let's"}</Text>
              <Text style={{fontSize: 28, fontWeight:'bold', color:'white'}}> {"BONE"}</Text>
            </View>
        </View>
      </View>
  }

  getMiddleView() {
      const { email, password, robot } = this.state;
      return <View style={{flexDirection:'column', margin: 16, alignItems:'center'}}>
            <IconizedTextInput
              placeholder="Email"
              ref={(instance) => {
                this.emailTxt = instance;
              }}
              onSubmitEditing={() => {
                this.passwordTxt.focus();
              }}
              onChangeText={text => {
                this.setState({ email : text})
              }}
              vaule={{email}}
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={{marginTop: 0}}
              keyboardType='email-address'
              returnKeyType='next'
              
            />
            <IconizedTextInput
              placeholder="Password"
              ref={(instance) => {
                this.passwordTxt = instance;
              }}
              onChangeText={text => {
                this.setState({ password : text})
              }}
              onSubmitEditing={() => {
                this.robotTxt.focus();
              }}
              value={password}
              secureTextEntry
              textContentType='password'
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={{marginTop: 8}}
              returnKeyType='next'
            />

            <View style={{flexDirection:'column', alignSelf:'stretch', alignItems:'flex-start', marginTop: 8}}>
              <Text style={[styles.text, {fontWeight:'bold'}]}>Empty the following field unless you are a:</Text>
              <IconizedTextInput
                placeholder="Robot"
                ref={(instance) => {
                  this.robotTxt = instance;
                }}
                onChangeText={text => {
                  this.setState({ robot : text})
                }}
                onSubmitEditing={() => {
                }}
                value={this.state.robot}
                bordered 
                bold
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={{marginTop: 4}}
              />
            </View>
      </View>
  }

  getBottomView = () =>  {
    return <View styles={{alignItems:'center', marign:16, height: 64, alignSelf:'stretch'}}>
        <Button
            primary
            bordered
            style={{ alignSelf: 'stretch', marginBottom: 32 }}
            caption={'GET IN'}
            onPress={() => {this.props.navigation.navigate('Main')}}
        />
      </View>
  }
  render() {
    return (
      <View style={styles.background}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always'>
          <View style={styles.container}>
            <View style={{flex:1}}>
              {this.getHeaderView()}
              {this.getMiddleView()}
            </View>
            {this.getBottomView()}
          </View>
        </KeyboardAwareScrollView>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: getBottomSpace()
  },
  background: {
    flex: 1,
    backgroundColor: 'black'
  },
  
  text: {
    fontSize: 14,
    color: 'white'
  }
});
