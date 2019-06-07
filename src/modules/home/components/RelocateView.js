import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import { colors } from '../../../styles';
import MapView, { Marker } from 'react-native-maps';
import { calculatePortraitDimension } from '../../../helpers';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
const { width : deviceWidth, height : deviceHeight } = calculatePortraitDimension();
const LATITUDE_DELTA = 25;
const LONGITUDE_DELTA = LATITUDE_DELTA * (deviceWidth / deviceHeight);
delta = { 
  latitudeDelta : LATITUDE_DELTA, 
  longitudeDelta: LONGITUDE_DELTA
};
export default class RelocateView extends React.Component {
 
  constructor(props) {
    super(props);
    const { location } = this.props;
    let region = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta : LATITUDE_DELTA, 
        longitudeDelta: LONGITUDE_DELTA
    }
    this.state = {
        region: region,
        delta: {
          latitudeDelta : LATITUDE_DELTA, 
          longitudeDelta: LONGITUDE_DELTA
        }
    }
  }   
  componentDidMount() {
  }

  getAddressComponent = (address) => {
    return <View style={{backgroundColor:'white', alignSelf:'stretch', height: 120}}>
        <View style={{flexDirection: 'column', flex:1, margin: 16}}>
            <Text style={styles.description}>{'Lokasi'}</Text>
            <Text style={[styles.text,{marginTop: 16, marginBottom:0}]}>{address}</Text>
        </View>
    </View>
  }

  onPressMap = (event) => {
    let region = {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        ...delta
    }
    this.setState({region})
  }

  renderCustomMarker = () => {
      return <Image style={styles.marker} source={require('../../../../assets/images/locate.png')} resizeMode='contain'/>
  }

  render() {
    const { region } = this.state;
    return (
        <View style={styles.container}> 
            <MapView

                ref={(ref) => {
                    this.map = ref;
                }}
                region={{...region}}
                style={styles.map}
                onPress={this.onPressMap}
                onRegionChange={(region) => {
                  delta = {
                    longitudeDelta : region.latitudeDelta * (deviceWidth / deviceHeight),
                    latitudeDelta: region.latitudeDelta
                  };
                }}
            >
                {
                    region && 
                    <MapView.Circle
                    key = { (region.latitude + region.longitude).toString() }
                    center = { this.state.region }
                    radius = { RADIUS }
                    strokeWidth = { 1 }
                    strokeColor = { colors.red }
              
                />
                }
              
                <Marker coordinate={region} >
                    {this.renderCustomMarker()}
                </Marker>


            </MapView>
        </View>

  
    );
  }
}

RADIUS = 250000;

const styles = StyleSheet.create({
  container: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },

  map: {
    flex:1
  },
  marker: {
    width : 32,
    height: 32
  },
  background: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  description: {
    fontSize: 17,
    color: colors.lightGray
  },

  text: {
    fontSize: 17,
    color: '#353535'
  },
});
