import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types';
import { colors } from '../../../styles';
import { ImageView } from '../../../components';

import { calculatePortraitDimension } from '../../../helpers';
const { height : deviceHeight } = calculatePortraitDimension();

class PhotosPanel extends React.Component {

    getImageItem = (item) => {
        const {smallImageUrl} = item;
        let isPrivate = item.isPrivate;
        let isAddButton = item.isAddButton;
          return <TouchableOpacity
            onPress={()=>{
              if(isAddButton) {
                if(this.props.onImagePressed)
                  this.props.onImagePressed(item);
                
              }else {
                if(this.props.onAddPressed)
                  this.props.onAddPressed()
              }

            }}
          >
          <View style={[styles.itemContainerStyle, { justifyContent: 'center', alignItems:'center'}, isPrivate && {backgroundColor:'white'}]}>
            {
                isAddButton ?
                    <ImageView 
                        style={styles.iconStyle} 
                        source={require('../../../../assets/images/plus_pic.png')}/>
                : 
                isPrivate ? <ImageView 
                        style={styles.itemContainerStyle} 
                        source={require('../../../../assets/images/lock.png')}/>
                : <ImageView
                  style={{flex:1}}
                  shortURl={smallImageUrl}
                  resizeMode='cover'
                />
            }

          </View>
          </TouchableOpacity>

         
    }
    renderItem = ({ item }) => {
        return this.getImageItem(item);
    }
    
    renderHorizonalUsers = () => {
        const { items } = this.props;
        console.log("items",items)
        return (
            <FlatList
                data={items} renderItem={this.renderItem}
                refreshing={false}
                keyExtractor={(item, index) => index.toString()}
                onRefresh={this.onRefresh}
                horizontal = {true}
            />
        );
      }
    render() {
        return (<View>
          {this.renderHorizonalUsers()}
        </View>);
    }

}

PhotosPanel.proptypes = { 
    itemContainerStyle: PropTypes.object,
    containerStyle: PropTypes.object,
    items: PropTypes.object,
    onAddPressed: PropTypes.func,
    onImagePressed: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
      alignSelf:'stretch',
      backgroundColor: 'black',
      height: 96,
    },

    itemContainerStyle: {
      width : 80,
      margin: 8,
      height: 80,
      backgroundColor: colors.darkGray
    },

    iconStyle: {
      width : 40,
      height: 40
    }
  
});

export default PhotosPanel
  