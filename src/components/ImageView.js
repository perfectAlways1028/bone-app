import React from 'react';
import { View } from 'react-native';
import { colors } from '../styles';
import { api } from '../config'
import FastImage from 'react-native-fast-image';

export default class ImageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
    }
    getFastImageResizeMode = (resizeMode) =>{
        switch(resizeMode) {
            case 'contain':
                return FastImage.resizeMode.contain;
            case 'cover':
                return FastImage.resizeMode.cover;
            case 'stretch':
                return FastImage.resizeMode.stretch;
            case 'center':
                return FastImage.resizeMode.contain;
            default:
                return FastImage.resizeMode.contain;
        }
            
    }
    onLoad(success){
        console.log("onLoad", success)
        this.setState({loaded: success})
    }
    render() {
        const { source, defaultImage, fullUrl } = this.props;
        var placeholder = defaultImage ? defaultImage : require('../../assets/images/defaultImage.png');
        var src = {...source};
        if(!fullUrl && src.uri) {
            src.uri = api.base + '/'+ source.uri;
        }
        console.log(src);
        
        return (
            <View style={[this.props.style, {alignItems:'center', justifyContent:'center'}]}>
                {
                    !this.state.loaded &&
                    <FastImage 
                            source={placeholder}
                            style={this.props.style}
                    />
                }
                <FastImage 
                    source={src}
                    style={this.state.loaded? this.props.style: {width:0, height:0} }
                    onLoad={()=> {
                        this.onLoad(false);
                    }}
                    onError={()=>{
                        this.onLoad(false);
                    }}
                />
            </View>
        );

    }
}