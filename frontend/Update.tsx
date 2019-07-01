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
import {Text, View, Alert } from 'react-native';
import styles from "./App.scss";
import { NavigationScreenProp } from 'react-navigation';
import mapStateToProps from './redux/mapState';
import { connect } from 'react-redux';
import { RichTextEditor } from 'react-native-zss-rich-text-editor'
import Strapi from 'strapi-sdk-javascript';
import { strapiUrl, strapiPort } from './statics';
import { Button, Icon } from '@ant-design/react-native';
import { NavigationDrawer } from './NavigationDrawer';

interface Props {
    navigation: NavigationScreenProp<any,any>
};

const strapi = new Strapi(`${strapiUrl}:${strapiPort}`);

class Update extends Component<Props> {
    state = {
        variables : this.AnalyzeVariablesFromJson(this.props.update.variables),
        styles: this.AnalyzeStylesFromJson(this.props.update.styles),
        has_change: false
    }
    static navigationOptions = ({ navigation }: any) => {
        const { params } = navigation.state;
        return {
            title: params ? params.title : 'Update ...',
            headerLeft: <NavigationDrawer navigationProps={navigation} />,
            drawerIcon: () => (
                <Icon name={`menu`} />
            ),
            headerRight: (
                <Button onPress={
                    () => {
                        params.save(params.props, params.self)
                    }
                }>Save</Button>
            )
        };
    };
    save(props: any, self: any){
        let updated_data = props.update
        let fetch_data = props.fetch_data
        let update_key = props.update_key
        if(self.state.has_change){
            let variables = self.AnalyzeVariablesToJson(self.state.variables)
            variables = JSON.parse(variables)
            let styles = self.AnalyzeStylesToJson(self.state.styles, variables)
            if(styles=='}'){
                styles = {}
            } else {
                styles = JSON.parse(styles)
            }
                let fresh_data = {styles , variables}
                fetch_data[update_key].styles = fresh_data.styles
                fetch_data[update_key].variables = fresh_data.variables
                props.dispatch({ type: "FETCH_DATA", payload: fetch_data });
                strapi.updateEntry('pages', updated_data.id, fresh_data)
                Alert.alert(
                    'Update successfully',
                    `${updated_data.name}`,
                    [
                    {text: 'OK', onPress: () => console.log('OK')},
                    ],
                    {cancelable: false},
                );
        } else {
            Alert.alert(
                'No Changes',
                ``,
                [
                {text: 'OK', onPress: () => console.log('OK')},
                ],
                {cancelable: false},
            );
        }
    }
    AnalyzeVariablesToJson(value: any){
        let finalString = '';
        let stringy = value
        const regex = /@[a-zA-Z0-9_\-#]+:'[a-zA-Z0-9_\-#]+';/gm;
        let m
        while ((m = regex.exec(stringy)) !== null) {
            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                let mth = match.replace(/@/g, '"@').replace(":'", '":"').replace("';", '",')
                finalString += mth+'\n'
            });
        }
        finalString = finalString.replace(/\r?\n|\r/g, '')
        finalString = `{${finalString.substring(0, finalString.length-1)}}`
        return finalString
    }
    AnalyzeStylesToJson(value: any, variables: any){
        let finalString: any = []
        let stringy = value
        const regex = /[a-zA-Z0-9_\-#]+:{[a-zA-Z0-9_\-#]+:['a-zA-Z0-9_\-#@;:]+}/gm;
        let m
        while ((m = regex.exec(stringy)) !== null) {
            let targetString: string = ''
            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                let mth = match.split(':{')
                for(var var_key in variables){
                    if(mth[1] && mth[1].indexOf(var_key)>-1){
                        var regx = new RegExp(var_key, 'g');
                        mth[1] = mth[1].replace(regx, `'${variables[var_key]}'`)
                    }
                }
                mth[1] = mth[1].replace(/:/g, '":').replace(/'/g,'"').replace(/;/g,',').replace(/",/g,'","')
                mth[1] = `{"${mth[1]}`
                mth[0] = `{"${mth[0]}":`
                targetString += mth[0]+mth[1]
            });
            finalString.push(targetString)
        }
        finalString = finalString.join()
        finalString = `${finalString.replace(/,{"/g, ',"')}}`
        return finalString
    }
    AnalyzeVariablesFromJson(value: any){
        let finalString = '';
        let stringy = value
        for(var key in stringy){
            finalString += `${key}:'${stringy[key]}';<br>`
        }
        return finalString
    }
    AnalyzeStylesFromJson(value: any){
        let finalString = '';
        let variables: any = this.props.update.variables
        let stringy = value
        for(var key in stringy){
            finalString += `${key}:{`
            let count = 0
            for(var inner_key in stringy[key]){
                let in_var: any = false
                for(var var_key in variables){
                    if(variables[var_key]==stringy[key][inner_key]){
                        in_var = var_key
                    }
                }
                if(in_var){
                    finalString += `${inner_key}:${in_var}`
                } else {
                    finalString += `${inner_key}:'${stringy[key][inner_key]}'`
                }
                count++
                if(Object.keys(stringy[key]).length>count){
                    finalString += ';'
                }
            }
            finalString += `}<br>`
        }
        return finalString
    }
    ChangeVariables(value: any){
        this.setState({variables : value, has_change: true})
    }
    ChangeStyles(value: any){
        this.setState({styles : value, has_change: true})
    }
    componentWillMount() {
        // use update to set title and props to use in navigation options of update page
        const { update } = this.props;
        if(update){
            this.props.navigation.setParams({title: `Update ${update.name}`})
            this.props.navigation.setParams({props: this.props})
            this.props.navigation.setParams({self: this})
            this.props.navigation.setParams({save: this.save})
        }
    }
    onEditorInitialized(value: number) {
        switch(value){
            case 1:
               this.variables.registerContentChangeListener((text: any) => { this.ChangeVariables(text) })
               break;
            case 2:
                this.styles.registerContentChangeListener((text: any) => { this.ChangeStyles(text) })
                break;
            default:
                console.log('nothing')
        }
    }
  render() {
    const { search, update } = this.props;
    return (
        <View style={styles.containerInner}>
            <View style={styles.rview}>
                <Text>Variables :</Text>
                <RichTextEditor
                    enableOnChange={ true }
                    ref={(r:any) => { this.variables = r }}
                    initialContentHTML={this.state.variables}
                    editorInitializedCallback={() => this.onEditorInitialized(1)}
                />
            </View>
            <View style={styles.rview}>
                <Text>Styles :</Text>
                <RichTextEditor
                    enableOnChange={ true }
                    ref={(r:any) => { this.styles = r }}
                    initialContentHTML={this.state.styles}
                    editorInitializedCallback={() => this.onEditorInitialized(2)}
                />
            </View>
        </View>
    );
  }
}

export default connect(mapStateToProps)(Update);