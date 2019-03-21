import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import styles from './../../styles';

export default class PickerField extends Component {
  static propTypes = {
    attributes: PropTypes.object,
    theme: PropTypes.object,
    updateValue: PropTypes.func,
    ErrorComponent: PropTypes.func,
  }
  handleChange(value) {
    const attributes = this.props.attributes;
    this.props.updateValue(attributes.name, attributes.options[value]);
  }
  render() {
    const { theme, attributes, ErrorComponent } = this.props;
    const isValueValid = attributes.options.indexOf(attributes.value) > -1;
    const pickerValue = attributes.options.indexOf(attributes.value).toString();
    let options = attributes.options;
    return (
      <View
        style={{...styles.pickerMainAndroid, ...{
          backgroundColor: theme.pickerBgColor,
          borderBottomColor: theme.inputBorderColor,
          borderBottomWidth: theme.borderWidth,
        }}}
      >
        <View style={{ flex: 7 }}>
          <Text style={{ color: theme.inputColorPlaceholder }}>{attributes.label}</Text>
        </View>
        <View style={{ flex: 3 }}>
          <RNPickerSelect
            placeholder={{label: " ", key: "placeholder", value: "", color: theme.pickerColorSelected}}
            placeholderTextColor={theme.pickerColorSelected}
            useNativeAndroidPickerStyle={true}
            items={attributes.options.map((i) => ({label: i, value: i}))}
            onValueChange={value => this.handleChange(value)}
            value={attributes.value}
            style={{
              color: theme.pickerColorSelected,
              inputAndroid: {
                color: theme.pickerColorSelected
              }
            }}
          />
          {/* <Picker
            style={{ padding: 2, color: theme.pickerColorSelected }}
            textStyle={{ color: theme.pickerColorSelected }}
            iosHeader="Select one"
            mode={attributes.mode}
            selectedValue={pickerValue}
            onValueChange={value => this.handleChange(value)}
          >{
              options.map((item, index) => (
                <Item key={index} label={item} value={`${index}`} />
              ))
            }
          </Picker> */}
        </View>
        <ErrorComponent {...{ attributes, theme }} />
      </View>
    );
  }
}