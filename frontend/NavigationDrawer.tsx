import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
interface Props {
    navigationProps: any
}
export class NavigationDrawer extends Component<Props> {
    //Structure for the navigatin Drawer
    toggleDrawer = () => {
      //Props to open/close the drawer
      this.props.navigationProps.toggleDrawer();
    };
    render() {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            {/*Donute Button Image */}
            <Icon name={`menu`} />
          </TouchableOpacity>
        </View>
      );
    }
  }