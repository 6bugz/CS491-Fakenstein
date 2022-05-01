import React, { useEffect } from 'react';
import {Dimensions, Route, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import { Text, View } from '../components/Themed';
import {Navigation} from "../constants/typesUtil";

type Props = {
  route: Route;
  navigation: Navigation;
}

export default function ModifyScreen({route, navigation}: Props) {

  useEffect(() => {
    console.log("Modify");
    console.log(route.params);
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
