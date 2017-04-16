import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const FloatingActionButton = ({ buttonText }) => {
  const {
    floatingButtonStyle,
    floatingButtonTextStyle
  } = styles;

  return (
    <TouchableOpacity style={floatingButtonStyle}>
      <Text style={floatingButtonTextStyle}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  floatingButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0eb550'
  },
  floatingButtonTextStyle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#fff'
  }
};

export default FloatingActionButton;
