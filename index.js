'use strict';

import React, {Component} from 'react';

import {
  AppRegistry,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

class CollectionView extends Component {
  groupItems = (items, itemsPerRow) => {
    let itemsGroups = [];
    let group = [];
    items.forEach(function (item) {
      if (group.length === itemsPerRow) {
        itemsGroups.push(group);
        group = [item];
      } else {
        group.push(item);
      }
    });

    if (group.length > 0) {
      itemsGroups.push(group);
    }

    return itemsGroups;
  };

  renderGroup = ({item}) => {
    const items = item.map((item, index) => {
      return this.props.renderItem(item, index);
    });
    return (
      <View style={styles.group}>
        {items}
      </View>
    );
  };

  render = () => {
    const groups = this.groupItems(this.props.items, this.props.itemsPerRow);
    return (
      <FlatList
        {...this.props}
        renderItem={this.renderGroup}
        data={groups}
      />
    );
  };
}

var styles = StyleSheet.create({
  group: {
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'center',
    overflow      : 'hidden'
  }
});

module.exports = CollectionView;
