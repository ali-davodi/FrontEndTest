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
import {Button, InputItem} from '@ant-design/react-native';
import styles from "./App.scss";
import { NavigationScreenProp } from 'react-navigation';
import mapStateToProps from './redux/mapState';
import { connect } from 'react-redux';

interface Props {
    navigation: NavigationScreenProp<any,any>
};
const placeSubmitHandler = (self: any, value: any) => {
    self.props.dispatch({ type: "SEARCH", value });
}
class Test extends Component<Props> {
    constructor(props: any){
        super(props);
    }
  render() {
    const { search } = this.props;
    console.log(this.props)
    return (
        <View style={styles.container}>
            <Text>We have no test!</Text>
            <InputItem
                clear
                value={search}
                onChange={(value: any) => {
                    placeSubmitHandler(this, value)
                }}
                extra={<Text>Test</Text>}
                placeholder="Test"
                editable={true}
            ></InputItem>
            <Text>You Type : { search }</Text>
            <Button
                onPress={() =>
                    this.props.navigation.navigate('Home')
                }
            >Back to Home</Button>
        </View>
    );
  }
}

export default connect(mapStateToProps)(Test);