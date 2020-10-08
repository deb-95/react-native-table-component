import React, { Component } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

type TableProps = {
  style: StyleProp<ViewStyle>;
  borderStyle: ViewStyle;
};

export class Table extends Component<TableProps> {

  _renderChildren(props) {
    return React.Children.map(props.children, child =>
      React.cloneElement(
        child,
        props.borderStyle && child.type.displayName !== 'ScrollView' ? { borderStyle: props.borderStyle } : {}
      )
    );
  }

  render() {
    const { borderStyle } = this.props;
    const borderLeftWidth = (borderStyle && borderStyle.borderWidth) || 0;
    const borderBottomWidth = borderLeftWidth;
    const borderColor = (borderStyle && borderStyle.borderColor) || '#000';

    return (
      <View
        style={[
          this.props.style,
          {
            borderLeftWidth,
            borderBottomWidth,
            borderColor
          }
        ]}
      >
        {this._renderChildren(this.props)}
      </View>
    );
  }
}

type TableWrapperProps = {
  style: StyleProp<ViewStyle>;
}

export class TableWrapper extends Component<TableWrapperProps> {

  _renderChildren(props) {
    return React.Children.map(props.children, child =>
      React.cloneElement(child, props.borderStyle ? { borderStyle: props.borderStyle } : {})
    );
  }

  render() {
    const { style } = this.props;
    return <View style={style}>{this._renderChildren(this.props)}</View>;
  }
}
