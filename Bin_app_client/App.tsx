

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  TextInput,
  Button,
  Touchable,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { IStreet } from './styles/interfaces';
import { styles } from './styles/stylesSheet';



function App(): JSX.Element {

    const [streets, setStreets] = useState<Array<IStreet>>();
    const [input,setInput] = useState<string>();

    useEffect(()=>{
      fetch("http://10.0.2.2:8080/streets") 
      .then((response) => response.json()) 
      .then((data : Array<IStreet>) => { 
          // Use the data from the server here 
          setStreets(data); 
      }) 
      .catch((error) => { 
          // Handle any errors that occur 
          console.error(error); 
      }); 
    },[])


  if (streets != null){


  return(
  <SafeAreaView style={styles.container}>
    <Text>{streets[0].name}</Text>
  <Text>test text</Text>
  <Text>{input}</Text>
  <TextInput onChangeText={setInput} style={styles.input}/>
  <TouchableOpacity style={styles.smallButton}>
    <Text style={{color:'white'}}>Click me</Text>
  </TouchableOpacity>
  
  
  
  </SafeAreaView>
  )
  } else{
    return(
    <Text>Loading...</Text>)
  }
  }



  




export default App;
