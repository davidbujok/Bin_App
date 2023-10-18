import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../styles/stylesSheet'
import { IStreet } from '../styles/interfaces'


function SearchingContainer({streets, handleFetchByStreet, setStreetName}) {

  return (
    <>
    <View style={styles.streetsList}>
    {streets && streets.map((street: IStreet) => {
      return (
        <Text 
          style={{fontSize: 21, fontWeight: '600', color: '#291D29'}}
          key={street.id}
          onPress={() => { handleFetchByStreet(street.name), setStreetName(street.name)}}>
          {street.name}
        </Text>
      );
    })}
   
  </View>
  </>
  )
}

export default SearchingContainer
