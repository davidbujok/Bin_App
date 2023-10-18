import React from 'react'
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles/stylesSheet'
import { IDate, IStreet } from '../styles/interfaces'


function SearchingContainer({streets,handleFetchByStreet,dates}) {
  return (
    <>
    <View style={styles.streetsList}>
    {streets && streets.map((street: IStreet) => {
      return (
        <Text 
          style={{fontSize: 21, fontWeight: '600', color: '#291D29'}}
          key={street.id}
          onPress={() => handleFetchByStreet(street.name)}>
          {street.name}
        </Text>
      );
    })}
   
  </View>
  </>
  )
}

export default SearchingContainer
// <TouchableOpacity style={styles.smallButton}>
// <Text style={{color: 'white'}}>--------------</Text>
// </TouchableOpacity>
// {dates != null &&
//   dates.map((date: IDate) => (
//         <Text key={date.id}>
//         {date.date} {date.binType}
//         </Text>
//         ))}
