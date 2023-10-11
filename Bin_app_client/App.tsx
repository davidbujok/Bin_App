

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
    const [fetchData,setFetchData] = useState<Boolean>(false);

    if((input&& input.length > 3)){
      if(fetchData === false){
        fetch("http://10.0.2.2:8080/streets") 
        .then((response) => response.json()) 
        .then((data : Array<IStreet>) => { 
            setStreets(data); 
            setFetchData(true)
        }) 
        .catch((error) => { 
            console.error(error); 
        }); 
        }
      else if(input.length<=3){
        setFetchData(false)
       }
      }

  if (streets != null){
    return(
    <SafeAreaView style={styles.container}>
    <Text>{streets[0].name}</Text>
    <Text>test text</Text>
    <Text>{input}</Text>
    <TextInput onChangeText={setInput} value={input} style={styles.input}/>
    <TouchableOpacity style={styles.smallButton}>
      <Text style={{color:'white'}}>Click me</Text>
    </TouchableOpacity>
    
    
    
    </SafeAreaView>
    )
    } 
  else {
    return(
      <>
    <Text>Loading...</Text>
    <TextInput onChangeText={setInput} value={input} style={styles.input}/>
    <Button title='click' onPress={()=> setFetchData(true)}></Button>
    </>
    )

  }
  }



  




export default App;
