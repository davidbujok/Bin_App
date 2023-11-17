import React from 'react';
import {Linking, Pressable, Text, View} from 'react-native';
import {main, styles} from '../styles/stylesSheet';

function Informations() {
  return (
    <View style={[main.container, {paddingTop: 10}]}>
      <Text
        style={{color: 'black', padding: 10}}
        onPress={() => Linking.openURL('http://www.binday.info')}>
        Website
      </Text>
      <Text
        style={{color: 'black', padding: 10}}
        onPress={() =>
          Linking.openURL('http://www.binday.info/project-team-data/')
        }>
        Team
      </Text>
      <Text
        style={{color: 'black', padding: 10}}
        onPress={() => Linking.openURL('https://forms.gle/WhXEDfU3t6c8fG5n9')}>
        Contact / Contribute
      </Text>
      <Text
        style={{color: 'black', padding: 10}}
        onPress={() =>
          Linking.openURL('http://www.binday.info/privacy-policy/')
        }>
        Privacy Policy
      </Text>
    </View>
  );
}

export default Informations;
