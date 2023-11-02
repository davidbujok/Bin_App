import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles/stylesSheet';
// import {IStreet} from '../styles/interfaces';

function SearchingContainer({streets, handleFetchByStreet, setStreetName}) {
  return (
    <>
      <View style={styles.streetsList}>
        {streets &&
          streets.map((street: String, index: number) => {
            return (
              <Text
                style={{fontSize: 21, fontWeight: '600', color: '#291D29'}}
                key={index}
                onPress={() => {
                  handleFetchByStreet(street), setStreetName(street);
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
