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
import { Button, BackgroundView, IconizedTextInput, LoadingOverlay } from '../../components'; 
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { calculatePortraitDimension, showToast, emailValidate, passwordValidate, sha256Hash } from '../../helpers'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

import { login } from './actions/AuthActions';

const { width: deviceWidth, height: deviceHeight } = calculatePortraitDimension();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'dingtester@mail.com',
      password: 'aaAA11!!'
    }
  }

  componentDidMount() {
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.auth.error !== nextProps.auth.error && nextProps.auth.error) {
      //login faild
      console.log("login faild");
      showToast("Invalid email or password.", "short")
    } else if (this.props.auth.success !== nextProps.auth.success && nextProps.auth.success) {
      //login success
      console.log("login success");
      
    }
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
      const { email, password } = this.state;
      console.log('email:', email);
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
              value={email}
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={{marginTop: 0}}
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
      </View>
  }

  getBottomView = () =>  {
    return <View style={{height: 64, alignItems: 'center', alignSelf: 'stretch', paddingHorizontal: 30}}>
        <Button
            primary
            style={{ alignSelf: 'stretch', marginBottom: 32, marignLeft :0, marginRight:0 }}
            caption={'Login'}
            onPress={() => {
              this.loginAction();
            }}
        />
      </View>
  }

  loginAction = () => {
    const {email, password} = this.state;
    const { dispatch } = this.props;
    if (!emailValidate(email)) {
      showToast('Invalid email address.')
      return;
    }
    if (!passwordValidate(password)) {
      showToast('Password should contain minimum 8 and maximum 20 characters with 1 upper case letter and 1 number minimum');
      return;
    }

    sha256Hash(password, ( hashedPassword)=>{
      let credential = {
        email: email,
        password: hashedPassword,
        firebaseToken : ''
      }
      dispatch(login(credential));
    })
  }
  
  render() {

    const { auth } = this.props; 
    return (
      <View style={styles.background}>
        <LoadingOverlay visible={auth.isLoading}/>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always'>
          <View style={styles.container}>
            <View style={{flex:1, alignItems:'center'}}>
              {this.getHeaderView()}
              {this.getMiddleView()}
            </View>

             { this.getBottomView()}
  
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

const mapStateToProps = (state) => ({ app: state.app, auth: state.auth });

export default connect(mapStateToProps)(Login);