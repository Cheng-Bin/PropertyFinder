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
            style={styles.container}
            renderScene={this.renderNav}
        />
    );
  }

  renderNav(route, nav) {
    return <SearchPage />;
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder);
