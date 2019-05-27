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
                if(this.props.onAddPressed)
                  this.props.onAddPressed()
   
              }else {
                if(this.props.onImagePressed)
                  this.props.onImagePressed(item);
                if(!this.props.selectable) {
                  this.props.navigation.navigate("PhotoModal", {shortUrl: item.bigImageUrl})
                }
              }

            }}
          >
          <View style={[styles.itemContainerStyle, { justifyContent: 'center', alignItems:'center'}, isPrivate && {backgroundColor:'white'}, this.props.itemContainerStyle]}>
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
          this.props.showType == 'horizontal' ? 
            <FlatList
                data={items} renderItem={this.renderItem}
                refreshing={false}
                keyExtractor={(item, index) => index.toString()}
                onRefresh={this.onRefresh}
                horizontal = {true}
                key={'horizontal'}
            />
            :
            <FlatList
              data={items} renderItem={this.renderItem}
              refreshing={false}
              keyExtractor={(item, index) => index.toString()}
              onRefresh={this.onRefresh}
              numColumns={3}
              key={'grid'}
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
    navigation: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired,
    onAddPressed: PropTypes.func,
    onImagePressed: PropTypes.func,
    selectable: PropTypes.bool,
    onSelectionChanged: PropTypes.func,
    horizontal: PropTypes.bool,
    showType: PropTypes.string,
    

};

const styles = StyleSheet.create({
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
  