import React from 'react';

import { colors } from '../styles';
import { api } from '../config'
import FastImage from 'react-native-fast-image';

export default class ImageView extends React.Component {
    constructor(props) {
        super(props);
        
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
    render() {
        const { source, defaultImage, fullUrl } = this.props;
        var src = source;
        if(source.uri == null || source.uri == '') {
            if(defaultImage) {
                src = defaultImage;
            } else {
                src = require('../../assets/images/defaultImage.png');
            }

        } else {
            if(!fullUrl) {
                src.uri = api.base + '/'+ src.uri;
               
            }
        }
        
        return (
            <FastImage
                style={this.props.style}
                source={src}
                resizeMode={this.getFastImageResizeMode(this.props.resizeMode)}
            />
        );

    }
}