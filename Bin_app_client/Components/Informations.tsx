import React from 'react';
import {Linking, Pressable, Text, View} from 'react-native';
import {info, main, styles} from '../styles/stylesSheet';
import {RFPercentage} from 'react-native-responsive-fontsize';

function Informations() {
  return (
    <>
      <View style={info.container}>
        <Text
          style={{
            fontSize: RFPercentage(5),
            textAlign: 'center',
            fontWeight: '800',
          }}>
          Links
        </Text>
        <Text
          style={info.text}
          onPress={() => Linking.openURL('http://www.binday.info')}>
          Website
        </Text>
        <Text
          style={info.text}
          onPress={() =>
            Linking.openURL('http://www.binday.info/project-team-data/')
          }>
          Team
        </Text>
        <Text
          style={info.text}
          onPress={() =>
            Linking.openURL('https://forms.gle/WhXEDfU3t6c8fG5n9')
          }>
          Feedback
        </Text>
        <Text
          style={info.text}
          onPress={() =>
            Linking.openURL('http://www.binday.info/privacy-policy/')
          }>
          Privacy Policy
        </Text>
        <Text
          style={info.text}
          onPress={() =>
            Linking.openURL(
              'https://www.edinburgh.gov.uk/bins-recycling/report-missed-bin',
            )
          }>
          Report a missed bin to Council
        </Text>
      </View>
    </>
  );
}

export default Informations;
