/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var GridView = require('react-native-grid-view');

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;
var MOVIES_PER_ROW = 3;

var Movie = React.createClass({
  render: function() {
      return <View style={styles.movie} >
        <Image
          source={{uri: this.props.movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View >
          <Text 
          style={styles.title}
          numberOfLines={3}>{this.props.movie.title}</Text>
          <Text style={styles.year}>{this.props.movie.year}</Text>
        </View>
      </View>
  },
});

var AwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      dataSource: null,
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: responseData.movies,
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <GridView
        items={this.state.dataSource}
        itemsPerRow={MOVIES_PER_ROW}
        renderItem={this.renderItem}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  renderItem: function(item) {
      return <Movie movie={item} />
  },
});

var styles = StyleSheet.create({
  movie: {
    height: 150,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 10,
    marginBottom: 8,
    width: 90,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('GridViewExample', () => AwesomeProject);
