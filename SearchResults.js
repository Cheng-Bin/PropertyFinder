'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ListView,
    TouchableHighlight,
} from 'react-native';

import PropertyView from './PropertyView';

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.title !== r2.title
        });
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.listings)
        };
    }

    rowPressed(propertyTitle) {
        var property = this.props.listings.filter(prop => prop.title === propertyTitle)[0];
        this.props.navigator.push({
            component: PropertyView,
            passProps: {property: property}
        });
    }

    renderRow(rowData, sectionID, rowID) {
        var price = rowData.price_formatted.split(' ')[0];
        return (
            <TouchableHighlight onPress={()=>this.rowPressed(rowData.title)}
                underlayColor='#dddddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={{uri: rowData.img_url}} />
                        <View style={styles.textContainer}>
                            <Text style={styles.price}>{price}</Text>
                            <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                style={styles.container}       
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this) }/>
        );
    }
}


var styles = StyleSheet.create({
     container: {
         marginTop: 60,
    },
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddddd',
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC',
    },
    title: {
        fontSize: 20,
        color: '#656565',
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10,
    },
});