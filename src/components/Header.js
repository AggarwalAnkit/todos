import React from 'react';
import { View, Text } from 'react-native';

const Header = ({ title }) => {
  const {
    headerContainerStyle,
    titleStyle
  } = styles;
  return (
    <View style={headerContainerStyle}>
      <Text style={titleStyle}>{title}</Text>
    </View>
  );
};

const styles = {
  headerContainerStyle: {
    paddingTop: 20,
    paddingBottom: 8,
    borderColor: '#fff',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: 'center',
    backgroundColor: '#0eb550'
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  }
};

export default Header;
