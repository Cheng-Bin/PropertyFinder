'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import SearchPage from './SearchPage';


/**
 *  Launcher
 * 
 * @author  chapin
 * @email   chengbin@lycam.tv
 * @class   PropertyFinder
 * @extends {Component}
 */
class PropertyFinder extends Component {
  
  render() {
    return (
        <Navigator
            initialRoute={{component: SearchPage}}
            style={styles.container}
            renderScene={this.renderNav}
        />
    );
  }

  renderNav(route, nav) {
    return <route.component navigator={nav} {...route.passProps} />;
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder);
