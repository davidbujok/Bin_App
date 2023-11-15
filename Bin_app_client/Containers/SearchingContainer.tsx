import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import {styles} from '../styles/stylesSheet';
// import {IStreet} from '../styles/interfaces';
import {capitaliseFirstLetter} from '../Helpers/StringFunctions';
import { RFPercentage } from "react-native-responsive-fontsize";


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function SearchingContainer({streets, handleFetchByStreet, setStreetName}) {
  return (
    <>
      <View style={styles.streetsList}>
        {streets &&
          streets.map((street: string, index: number) => {
            let streetAsArray = capitaliseFirstLetter(street.split(' '));
            street = streetAsArray.join(' ');
            let firstPart = '';
            let secondPart = '';
            const numbers = /[0-9\-]{1,10}/;
            if (numbers.test(street)) {
              const splitIntoArray = street.split(/\s+(?=\d)/);

              if (splitIntoArray.length >= 2) {
                firstPart = splitIntoArray[0];
                secondPart = splitIntoArray.slice(1).join(' ');

                if (secondPart.match(/^\d/)) {
                  secondPart = secondPart.replace(/^0+/, '');
                }

                // console.log("firstPart :", firstPart);
                // console.log("secondPart :", secart);

                return (
                  <View key={street + `${index}`}>
                    <Text
                      style={{
                        fontSize: RFPercentage(2.5),
                        fontWeight: '600',
                        color: '#291D29',
                        textAlign: 'left',
                        minWidth: RFPercentage(40),
                        maxWidth: RFPercentage(40),
                      }}
                      key={index + 1}
                      onPress={() => {
                        handleFetchByStreet(street.toLowerCase()),
                          setStreetName(street);
                      }}>
                      {firstPart}
                    </Text>
                    <Text
                      style={{
                        fontSize: RFPercentage(2),
                        fontWeight: '400',
                        color: '#291D29',
                        textAlign: 'left',
                        minWidth: RFPercentage(40),
                        maxWidth: RFPercentage(40),
                      }}
                      key={index + 200}
                      onPress={() => {
                        handleFetchByStreet(street.toLowerCase()),
                          setStreetName(street);
                      }}>
                      {secondPart}
                    </Text>
                  </View>
                );
              }
            }

            return (
              <Text
                style={{
                  fontSize: RFPercentage(2.55),
                  fontWeight: '600',
                  color: '#291D29',
                  textAlign: 'left',
                  minWidth: RFPercentage(2),
                  maxWidth: RFPercentage(40),
                }}
                key={index + 500}
                onPress={() => {
                  handleFetchByStreet(street.toLowerCase()),
                    setStreetName(street);
                }}>
                {street}
              </Text>
            );
          })}
      </View>
    </>
  );
}

export default SearchingContainer;
