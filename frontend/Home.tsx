/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from '@ant-design/react-native';
import styles from "./App.scss";
import { NavigationScreenProp } from 'react-navigation';
import mapStateToProps from './redux/mapState';
import { connect } from 'react-redux';

interface Props {
    navigation: NavigationScreenProp<any,any>
};
class Home extends Component<Props> {
  render() {
    const { search } = this.props;
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to React Native!</Text>
            <Text style={styles.instructions}>You Type : { search }</Text>
            <Button
                onPress={() =>
                    this.props.navigation.navigate('Test')
                }
            >Test Navigation</Button>
        </View>
    );
  }
}

export default connect(mapStateToProps)(Home)