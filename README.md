# react-native-grid-view

This component allows to display a grid/collection of items with more than one item per row. The items per row is configurable and it uses a 'ListView' in order to have a proper recycle mechanism.

![Image of react-grid-view](screen1.jpg)

## Getting started

1. `npm install react-native-grid-view`

## Example

All you need is to `require` the `react-native-grid-view` module and then use the
`<GridView/>` tag.

```javascript
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View
} = React;
var GridView = require('react-native-grid-view');

var myApp = React.createClass({
  render: function() {
    return (
      <GridView
        items={this.state.movies}
        itemsPerRow={3}
        renderItem={this.renderItem}
      />
    );
  },
  renderItem: function(item) {
    return <Movie movie={item} />
  },
});

AppRegistry.registerComponent('myApp', () => myApp);
```
