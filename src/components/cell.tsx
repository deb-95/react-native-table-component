import React, { Component } from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native';

type CellProps = {
  data: any;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  flex?: number;
  borderStyle?: ViewStyle;
  testID?: string;
};

export class Cell extends Component<CellProps> {

  render() {
    const { data, width, height, flex, style, textStyle, borderStyle, testID, ...props } = this.props;
    const textDom = React.isValidElement(data) ? (
      data
    ) : (
      <Text style={[textStyle, styles.text]} {...props}>
        {data}
      </Text>
    );
    const borderTopWidth = (borderStyle && borderStyle.borderWidth) || 0;
    const borderRightWidth = borderTopWidth;
    const borderColor = (borderStyle && borderStyle.borderColor) || '#000';
    const widthStyle = width ? { width } : {};
    const heightStyle = height ? { height } : {};
    let flexStyle = flex ? {flex} : {};
    if(width && !flex && !height && !style) {
      flexStyle = { flex: 1 };
    }
    return (
      <View
        testID={testID}
        style={[
          {
            borderTopWidth,
            borderRightWidth,
            borderColor
          },
          styles.cell,
          widthStyle,
          heightStyle,
          flexStyle,
          style
        ]}
      >
        {textDom}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cell: { justifyContent: 'center' },
  text: { backgroundColor: 'transparent' }
});
