import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Platform,
  TouchableOpacity
} from 'react-native';


import { connect } from 'react-redux';

import { calculatePortraitDimension } from '../../helpers';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { TopNavigatorView } from '../../components';
import PhotosPanel from './components/PhotosPanel';
import { colors } from '../../styles';
import { deleteGallery, addGallery } from '../../actions/GalleryActions';
const { height : deviceHeight, width: deviceWidth } = calculatePortraitDimension();
import ImagePicker from 'react-native-image-crop-picker';

class GalleryEdit extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        isEdit : false
      }
    }
    onPickFromGallery = () => {
      ImagePicker.openPicker({
        width: 1024,
        height: 1024,
        cropping: true
      }).then(image => {
        this.choosePrivate({uri: image.path, width: image.width, height: image.height, mime: image.mime});
      });
    }
    onPickFromCamera = () => {
      ImagePicker.openCamera({
        width: 1024,
        height: 1024,
        cropping: true,
      }).then(image => {
        this.choosePrivate({uri: image.path, width: image.width, height: image.height, mime: image.mime});
      });
    }
    choosePrivate = (image) => {
      console.log("choose private",image);
      this.props.navigation.navigate("UploadPhoto", {
        image: image
      })
    }

    onImagePick = () => {

      Alert.alert(
        'Upload photo',
        'Whould you like to upload a photo from the camera or your gallyer?',
        [
          {text: 'Camera', onPress: () => {
            this.onPickFromCamera();
          }},
          {
            text: 'Gallery',
            onPress: () => {
              this.onPickFromGallery();
            },
 
          },
          {text: 'Cancel', style: 'cancel'},
        ],
        {cancelable: false},
      );
    
    }
    getDeleteButton() {
      return <TouchableOpacity 
      onPress={()=>{

      }}>
        <View style={{paddingRight: 16, height: 50, justifyContent:'center', alignItems:'center'}} >
           <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold'}}>Delete</Text>
        </View>
     
      </TouchableOpacity>
    }
    getTopNavigator() {
      return <TopNavigatorView
        title={'Gallery'}
        onBackPressed = {() => {

        }}

        rightComponent = {this.getDeleteButton()}
      />
    }

    getPhotoSection = ( items ) => {
      if(items.length == 0 ||  (items.length >0 && !(items[0].isAddButton))) {
        items.unshift({isAddButton:true})
      }

      return <PhotosPanel
        items={items}
        onAddPressed={(item)=>{
          console.log(item);
          this.onImagePick()
        }}
        onImagePressed={(item)=>{
          console.log(item);
        }}
        showType={'grid'}
      />
    }


    getGallery(items){
      if(items.length == 0 ||  (items.length >0 && !(items[0].isAddButton))) {
        items.unshift({isAddButton:true})
      }
      return <View style={{flex:1, marginTop: 50}}>
        <PhotosPanel
          items={items}
          onAddPressed={()=>{
            this.onImagePick();
          }}
          itemContainerStyle={styles.itemContainerStyle}
          onImagePressed={(item)=>{
            console.log(item);
          }}
          navigation={this.props.navigation}
        />
      </View>
    }

    getBottomButton(){
      return <View style={{ alignSelf:'stretch',justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity
          style={{ height: 40, margin: 16, alignSelf:'stretch',backgroundColor: colors.red, justifyContent:'center', alignItems:'center' }}
          onPress={()=>{
            this.setState({isEdit: !this.state.isEdit})
          }}
        > 
           <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold'}}>EDIT</Text>
        </TouchableOpacity>
      </View>
    }

    render() {
        const { user } = this.props.auth;
        return (
            <View style={styles.background}>
              <View style={styles.container}>
                { this.getTopNavigator() }
                { this.getGallery(user.userPhotos)}
                { this.getBottomButton()}
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
        marginTop: Platform.OS === 'ios' ? getStatusBarHeight(true) : 0,
        marginBottom: getBottomSpace()
    },

    itemContainerStyle: {
      width : deviceWidth / 3 - 16,
      margin: 8,
      height : deviceWidth / 3 - 16,
      backgroundColor: colors.darkGray
    },


});

const mapStateToProps = (state) => ({ app: state.app, auth: state.auth });

export default connect(mapStateToProps)(GalleryEdit);