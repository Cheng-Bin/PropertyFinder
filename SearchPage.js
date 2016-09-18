'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Image,
    ActivityIndicator,
} from 'react-native';

import SearchResults from './SearchResults';



export default class SearchPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'london',
            isLoading: false,
            message: ''
        };
    }

    onSearchTextChanged(event) {
        console.log('onSearchTextChanged');
        this.setState({searchString: event.nativeEvent.text});
        console.log(this.state.searchString);
    }


    
    urlForQueryAndPage(key, value, pageNumber) {
        var data = {
            country: 'uk',
            pretty: '1',
            encoding: 'json',
            listing_type: 'buy',
            action: 'search_listings',
            page: pageNumber
        };

        data[key] = value;
        var querystring = Object.keys(data)
            .map(key => key + '=' + encodeURIComponent(data[key]))
            .join('&');
        return 'http://api.nestoria.co.uk/api?' + querystring;
    }

    _executeQuery(query) {
        console.log(query);
        this.setState({isLoading: true});
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResponse(json.response))
            .catch(error => {
                this.setState({
                    isLoading: false,
                    message: 'Something bad happend: ' + error
                });
            });
    }

    _handleResponse(response) {  
        this.setState({isLoading: false, message: ''});
        if (response.application_response_code.substr(0, 1) === '1') {
            this.props.navigator.push({
                component: SearchResults,
                passProps: {listings: response.listings}
            });
        } else {
            this.setState({message: 'Location not recognized; please try again.'});
        }
    }

   
    onSearchPressed() {
        var query = this.urlForQueryAndPage('place_name', this.state.searchString, 1);
        this._executeQuery(query);
    }


    render() {
      var spinner = this.state.isLoading ? 
            (<ActivityIndicator hidden='true' size='large' color='#00aa00' />) : (<View />);
      return ( 
        <View style={styles.container}>
          <Text style={styles.description}>
            Search for house to Buy!
          </Text>
          <Text style={styles.description}>
            {this.state.message}
          </Text>
          <View style={styles.flowRight}>
            <TextInput 
                style={styles.searchInput}
                value={this.state.searchString}
                onChange={this.onSearchTextChanged.bind(this)}
                placeholder='Search via name or postcode'
            />
            <TouchableHighlight style={styles.button}
                                underlayColor='#99d9f4'
                                onPress={this.onSearchPressed.bind(this)}>
              <Text style={styles.buttonText}>Go</Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight style={styles.button}
                              underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Location</Text>
          </TouchableHighlight>
          <Image source={{uri: 'house'}}
                style={styles.image} />
          {spinner}
        </View>
      );
    }
}

var styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565',
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center',
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    image: {
        width: 217,
        height: 138,
    },
});