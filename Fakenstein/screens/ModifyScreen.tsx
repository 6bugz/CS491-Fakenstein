import React, { useEffect } from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import { Text, View } from '../components/Themed';


export default function ModifyScreen() {

  useEffect(() => {
    console.log("Modify");
  }, []);


  return  (
      <View style={styles.container}>
        <Text style={styles.text}>Select faces to modify</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: undefined,
    resizeMode: 'contain',
  },
  boxContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width,
  },
  text: {
    color: Colors.dark.text,
    fontSize: 20,
    fontWeight: '600',
  },
});
