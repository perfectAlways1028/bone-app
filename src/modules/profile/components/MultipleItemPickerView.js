import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,


} from 'react-native';

import { fonts, colors } from '../../../styles'; 
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { calculatePortraitDimension, showToast } from '../../../helpers'
import ListItemSwitch from './ListItemSwitch'

class MultipleItemPickerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        items : props.navigation.getParam('items'),
        title: props.navigation.getParam('title'),
        selectedItems: props.navigation.getParam('selectedItems') ? props.navigation.getParam('selectedItems') : []
    }
  }

  selectItem(isSelected, item) {
    let selectedItems = this.state.selectedItems;
    if(isSelected){
        selectedItems.push(item);
        this.setState({selectedItems});
        console.log("selectedItem", selectedItems);
        if( this.props.navigation.state.params.returnData)
            this.props.navigation.state.params.returnData(selectedItems);
    }else {
        let newItems = [];
        for(let i = 0; i< selectedItems.length; i++ ) {
            if(selectedItems[i].id != item.id) {
                newItems.push(selectedItems[i]);
            }
        }
        this.setState({selectedItems: newItems});
        if( this.props.navigation.state.params.returnData)
            this.props.navigation.state.params.returnData(newItems);
            console.log("selectedItem", newItems);

    }
  }
  checkSelected(item){
    for(let i=0; i<this.state.selectedItems.length; i++){
      if(this.state.selectedItems[i].id == item.id)
      return true;
    }
    return false;
  }

  renderItem = ({ item }) => {
    if(item.imageOn && item.imageOff) {
        return <ListItemSwitch
            title={item.name}
            rightIconOnShortUrl={item.imageOn}
            rightIconOffShortUrl={item.imageOff}
            value={this.checkSelected(item)}
            hideText
            onChangeState={(value)=>{
                this.selectItem(value, item);
            }}
        />
    } else {
        return <ListItemSwitch
            title={item.name}
            rightIconImageOn={require('../../../../assets/images/boneoncb.png')}
            rightIconImageOff={require('../../../../assets/images/boneoffcb.png')}
            value={this.checkSelected(item)}
            hideText
            onChangeState={(value)=>{
                this.selectItem(value, item);
            }}
        />
    }


  }

  renderItemList = () => {
    const { items } = this.state;
    console.log("multipleItem", items);
    return (<FlatList
      data={items} renderItem={this.renderItem}
      refreshing={false}
      keyExtractor={(item, index) => index.toString()}
      onRefresh={this.onRefresh}
    />);
  }

  
  render() {

    return (
      <View style={styles.background}>
          <View style={styles.container}>
             {this.renderItemList()}
          </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
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

  textArea: {
    borderRadius: 4,
    padding: 8,
    borderColor: colors.lightGray,
    color: colors.black,
    backgroundColor: 'white',
    fontSize: 14,
    marginTop: 16,
    borderWidth: 1,
    minHeight: 120,
    flex:1,
    alignSelf:'stretch',
    marginBottom: 16
  }
});

export default MultipleItemPickerView;