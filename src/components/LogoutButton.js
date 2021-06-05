import React from 'react';
import {
  View,
  Platform,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import {logout} from '../store/actions/auth';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {normalize} from './FieldInput';

class LogoutButton extends React.Component {
  onPress = () => {
    this.props.logout();
    // this.props.navigation.navigate('Login');
    this.props.navigation.navigate('Startup');
    console.log(this.props);
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={styles.logout}>
        <Text
          style={{fontSize: 15, color: '#FFF', letterSpacing: 0.68}}>
          Logout
        </Text>
      </TouchableOpacity>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: bindActionCreators(logout, dispatch),
});

const styles = StyleSheet.create({
  logout: {
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: 'red',
    marginRight: 10,
    borderRadius: 10,
    textAlign: 'center'
  },
});

export default connect(null, mapDispatchToProps)(LogoutButton);
