'use strict';

var React = require('react-native');

var {
  AppRegistry,
  View,
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
        return {items: [], renderRow: null, style: undefined, itemsPerRow: 1};
    },
    render: function() {
        var groups = this.groupItems(this.props.items, this.props.itemsPerRow);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (<ListView
            dataSource={ds.cloneWithRows(groups)}
            renderRow={this.props.renderRow}
            style={this.props.style}
        />);
    },
});

module.exports = CollectionView;
