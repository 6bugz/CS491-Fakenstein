import React, {useEffect} from 'react';
import {Dimensions, Image,  Route, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import { Text, View } from '../components/Themed';
import {ImageType} from "../constants/typesUtil";

type Props = {
  route: Route;
}

export default function ExportScreen({route}: Props) {
  const image: ImageType = (route.params.image);

  useEffect(() => {
    console.log("Export");
  }, []);


  return  (
    !!image && (
      <View style={styles.container}>
        <Text style={styles.text}>Export Your Image</Text>
        <Image source={{uri: image.uri}} style={styles.image}/>
      </View>
    )
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
  },
  text: {
    color: Colors.dark.text,
    fontSize: 20,
    fontWeight: '600',
  },
});
