import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';


import { connect } from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.background}>
          <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
          </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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

const mapStateToProps = (state) => ({ app: state.app });

export default connect(mapStateToProps)(Home);