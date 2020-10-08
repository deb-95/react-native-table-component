import React, { Component, PropsWithChildren } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

type TableProps = {
  style: StyleProp<ViewStyle>;
  borderStyle: ViewStyle;
};

export class Table extends Component<PropsWithChildren<TableProps>> {
  _renderChildren(props: PropsWithChildren<TableProps>) {
    return React.Children.map(props.children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement<{borderStyle: any} | {}>(
          child,
          props.borderStyle && (child.type as React.FunctionComponent).displayName !== 'ScrollView' ? { borderStyle: props.borderStyle } : {}
        );
      }
    });
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
  borderStyle: ViewStyle;
};

export class TableWrapper extends Component<PropsWithChildren<TableWrapperProps>> {
  _renderChildren(props: PropsWithChildren<TableWrapperProps>) {
    return React.Children.map(props.children, child =>
      React.cloneElement(child as React.ReactElement, props.borderStyle ? { borderStyle: props.borderStyle } : {})
    );
  }

  render() {
    const { style } = this.props;
    return <View style={style}>{this._renderChildren(this.props)}</View>;
  }
}
