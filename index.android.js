'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity
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
            configureScene={this.configureScene}
            initialRoute={{component: SearchPage}}
            style={styles.container}
            renderScene={this.renderScene}
            navigationBar={
              <Navigator.NavigationBar 
                style={styles.navContainer}
                routeMapper={NavigationBarRouteMapper} />
            }
        />
    );
  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromRight;
  }

  renderScene(route, nav) {
    return <route.component navigator={nav} {...route.passProps} />;
  }

}


var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
      if (index > 0) {
        return (
          <View style={styles.navContainer}>
            <TouchableOpacity
              underlayColor='transparent'
              onPress={()=> { if (index > 0) { navigator.pop() }}}>
              <Text style={styles.leftNavButtonText}>返回</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return null;
      }
    },
    RightButton(route, navigator, index, navState) {

    },
    Title(route, navigator, index, navState) {
      return (
        <View style={styles.navContainer}>
          <Text style={styles.title}>查询页面</Text>
        </View>
      );
    }
 };

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navContainer: {
    flex: 1,
    backgroundColor: '#48BBEC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 70,
  },
  leftNavButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 13,
  },
});

AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder);
