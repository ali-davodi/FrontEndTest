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
import {Button, Tabs} from '@ant-design/react-native';
import styles from "./App.scss";
import { NavigationScreenProp } from 'react-navigation';
import mapStateToProps from './redux/mapState';
import { connect } from 'react-redux';
import Strapi from 'strapi-sdk-javascript';
const strapi = new Strapi('http://192.168.1.5:1337');

interface Props {
    navigation: NavigationScreenProp<any,any>
};
function changeTab(self: any, value: any){
    value += 1
    if(self.props.fetch_data){
        self.props.fetch_data.map(function(res: any){
            if(res.id==value)
                self.props.dispatch({ type: "UPDATE", payload: res })
        })
    }
    /*self.props.dispatch(async function(dispatch:any) {
        
    });*/
}
async function fetch_data(self: any){
    const pages = await strapi.getEntries('pages');
    self.props.dispatch({ type: "FETCH_DATA", payload: pages });
    changeTab(self, 1)
}
class Home extends Component<Props> {
    constructor(props: any){
        super(props);
    }
    componentWillMount(){
        fetch_data(this)
    }
  render() {
    const { search, update , fetch_data } = this.props;
    const tabs: any[] = []
    if(fetch_data){
        fetch_data.map(function(res: any){
            tabs.push({title: res.name})
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                <Tabs tabs={tabs} onChange={(tab: any, index: number) => {
                        changeTab(this, index)
                }}>
                    {
                        fetch_data ?
                        fetch_data.map(function(res: any){
                            return (
                                <View style={styles.tabstyle}>
                                    <Text style={styles.leftTextBold}>Variables : </Text>
                                    <Text style={styles.leftText}>{JSON.stringify(res.variables)}</Text>
                                    <Text style={styles.leftTextBold}>Styles : </Text>
                                    <Text style={styles.leftText}>{JSON.stringify(res.styles)}</Text>
                                </View>
                            )
                        }) : ''
                    }
                </Tabs>
                <Button
                    onPress={() =>
                        this.props.navigation.navigate('Test')
                    }
                >Update</Button>
            </View>
            <Text style={styles.instructions}>You Select : { JSON.stringify(update) }</Text>
        </View>
    );
  }
}

export default connect(mapStateToProps)(Home)