import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles/stylesSheet';
// import {IStreet} from '../styles/interfaces';
import { capitaliseFirstLetter } from '../Helpers/StringFunctions';

function SearchingContainer({streets, handleFetchByStreet, setStreetName}) {
  return (
    <>
      <View style={styles.streetsList}>
        {streets &&
          streets.map((street: string, index: number) => {
            let streetAsArray = capitaliseFirstLetter(street.split(" "))
            street = streetAsArray.join(" ")
            let firstPart = "";
            let secondPart = "";
            const numbers = /[0-9\-]{1,10}/
            if (numbers.test(street)) {
            
              const splitIntoArray = street.split(/\s+(?=\d)/);

              
              if (splitIntoArray.length >= 2) {
                firstPart = splitIntoArray[0];
                secondPart = splitIntoArray.slice(1).join(' ');
                
                if (secondPart.match(/^\d/)) {
                  secondPart = secondPart.replace(/^0+/, '');
                }
            
                // console.log("firstPart :", firstPart);
                // console.log("secondPart :", secondPart);

                return(<View>
                <Text
                  style={{fontSize: 21, fontWeight: '600', color: '#291D29'}}
                  key={index+1}
                  onPress={() => {
                    handleFetchByStreet(street.toLowerCase()), setStreetName(street);
                  }}>
                  {firstPart}
                </Text>
                <Text
                  style={{fontSize: 15, fontWeight: '400', color: '#291D29'}}
                  key={index+200}
                  onPress={() => {
                    handleFetchByStreet(street.toLowerCase()), setStreetName(street);
                  }}>
                  {secondPart}
                </Text>
                </View>
                )
            } 
            }


            
            return (
              <Text
                style={{fontSize: 21, fontWeight: '600', color: '#291D29'}}
                key={index}
                onPress={() => {
                  handleFetchByStreet(street.toLowerCase()), setStreetName(street);
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
