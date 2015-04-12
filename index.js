'use strict';

var React = require('react-native');

var {
  AppRegistry,
  View,
  StyleSheet,
  ListView,
} = React;

var CollectionView = React.createClass({
    groupItems: function(items, itemsPerRow) {
        var itemsGroups = [];
        var group = [];
        items.forEach(function(item) {
          if (group.length == itemsPerRow) {
            itemsGroups.push(group);
            group = [];
          } else {
            group.push(item);
          }
        });

        if (group.length > 0) {
          itemsGroups.push(group);
        }

        return itemsGroups;
    },
    getInitialState: function() {
        return {items: [], renderItem: null, style: undefined, itemsPerRow: 1};
    },
    renderGroup: function(group) {
      var that = this;
      var movies = group.map(function(movie) {
        return that.props.renderItem(movie);
      });
      return (
        <View style={styles.group}>
          {movies}
        </View>
      );
    },
    render: function() {
        var groups = this.groupItems(this.props.items, this.props.itemsPerRow);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (<ListView
          dataSource={ds.cloneWithRows(groups)}
          renderRow={this.renderGroup}
          style={this.props.style}
        />);
    },
});


var styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

module.exports = CollectionView;
