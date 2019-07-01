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
import {Text, View, ScrollView} from 'react-native';
import {Button, Tabs, Icon} from '@ant-design/react-native';
import styles from "./App.scss";
import { NavigationScreenProp } from 'react-navigation';
import mapStateToProps from './redux/mapState';
import { connect } from 'react-redux';
import Strapi from 'strapi-sdk-javascript';
import { strapiUrl, strapiPort } from './statics';
import { NavigationDrawer } from './NavigationDrawer';

interface Props {
    navigation: NavigationScreenProp<any,any>
};
// create strapi connection
const strapi = new Strapi(`${strapiUrl}:${strapiPort}`);
// this function call when click on each tab of pages
function changeTab(self: any, value: any){
    value += 1
    if(self.props.fetch_data){
        self.props.fetch_data.map(function(res: any, key: number){
            if(res.id==value){
                self.props.dispatch({ type: "UPDATE", payload: res })
                self.props.dispatch({ type: "UPDATE_KEY", payload: key })
            }
        })
    }
    /*self.props.dispatch(async function(dispatch:any) {
    });*/
}
// fetch data from strapi and "pages" content
async function fetch_data(self: any){
    const pages = await strapi.getEntries('pages?_sort=id:ASC');
    self.props.dispatch({ type: "FETCH_DATA", payload: pages });
    // set data in update state for change tab
    changeTab(self, 0)
}
class Home extends Component<Props> {
    state = {
        drawer: false, // drawer is closed
    }
    // add title and right header for navigation header , and append "Update" button to header
    static navigationOptions = ({ navigation }: any) => {
        const { params } = navigation.state;
        return {
            title: 'Pages',
            headerLeft: <NavigationDrawer navigationProps={navigation} />,
            headerRight: (
                <React.Fragment>
                    <Button
                        onPress={() =>
                            navigation.navigate('Update')
                        }
                    >Update</Button>
                </React.Fragment>
            )
        }
    }
    onButtonPress = (self: any) => {
        self.setState({drawer: false})
        self._drawer.close()
    }
    componentWillMount(){
        // call fetch_data function , before component mount ( will mount )
        this.props.navigation.setParams({props: this})
        fetch_data(this)
    }
    componentDidMount(){
        this.props.navigation.addListener('willFocus', () =>{
            fetch_data(this)
        })
    }
  render() {
    // get states data from this.props ( reducer )
    const { search, update , fetch_data } = this.props;
    // tabs header to select , show data that fetched from "pages" content
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
                                <View key={res.id} style={styles.tabstyle}>
                                    <Text style={styles.leftTextBold}>Variables : </Text>
                                    <Text style={styles.leftText}>{JSON.stringify(res.variables)}</Text>
                                    <Text style={styles.leftTextBold}>Styles : </Text>
                                    <Text style={styles.leftText}>{JSON.stringify(res.styles)}</Text>
                                </View>
                            )
                        }) : ''
                    }
                </Tabs>
            </View>
        </View>
    );
  }
}

export default connect(mapStateToProps)(Home)