import React, {useEffect, useState} from 'react';
import {Linking, Pressable, Text, View} from 'react-native';
import {info, main, styles} from '../styles/stylesSheet';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Keyboard} from 'react-native';
import VersionInfo from 'react-native-version-info';

function Informations() {
  const [version, setVersion] = useState<string>('');
  useEffect(() => {
    setVersion(`${VersionInfo.appVersion} (${VersionInfo.buildVersion})`);
  }, []);

  //   const version = '1.0.25';
  return (
    <>
      <View style={info.container}>
        <Text
          style={{
            fontSize: RFPercentage(2),
            textAlign: 'center',
            fontWeight: '500',
            paddingBottom: 20,
          }}>
          Version: {version}
        </Text>
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
