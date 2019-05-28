import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import PropTypes from 'prop-types';
import { colors } from '../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ListItemSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            value: false
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.value});
    }

    onItemPress = () =>{
        this.setState({value: !this.state.value})
        if(this.props.onChangeState) 
            this.props.onChangeState(!this.state.value)
    }   
    render () {
        const { title, rightIconImageOn, rightIconImageOff, textOn, textOff, colorOn, colorOff } = this.props; 
        return (
            <TouchableOpacity
                onPress={()=>{
                    this.onItemPress();
                }}
                >
                <View style={[styles.itemContainerStyle, this.props.itemContainerStyle]}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'flex-end'}}>
                 
                        {
                            <Text style={ [this.state.value? styles.textOn : styles.textOff, 
                                            {marginRight: 16, color: this.state.value ? 
                                                (colorOn || colors.red) 
                                                : 
                                                (colorOff || colors.white)}]}>
                                {this.state.value? (textOn || 'ON') : (textOff || 'OFF') }
                            </Text>
                        }
                        {
                            <Image source={ this.state.value ? rightIconImageOn : rightIconImageOff}  style={{width: 24, height:24}}/>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

ListItemSwitch.proptypes = { 
  title: PropTypes.object.isRequired,
  text: PropTypes.string,
  rightIconImageOn: PropTypes.object.isRequired,
  rightIconImageOff: PropTypes.object.isRequired,
  textOn: PropTypes.string,
  textOff: PropTypes.string,
  colorOn: PropTypes.string,
  colorOff: PropTypes.string,
  onChangeState: PropTypes.func,
  value: PropTypes.bool

};

const styles = StyleSheet.create({
    itemContainerStyle: {
        height: 48,
        backgroundColor: colors.black,
        marginLeft: 16,
        marginRight: 16,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        borderBottomColor: colors.darkGray
    },
    title: {
        fontSize: 14,
        color: 'white'
    },

    textOn: {
        fontSize: 14,
        color: colors.red
    },
    textOff:{
        fontSize: 14,
        color: colors.white
    }
});
