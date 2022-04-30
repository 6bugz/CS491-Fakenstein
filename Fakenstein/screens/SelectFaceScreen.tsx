import React, { useState, useEffect } from 'react';
import {Dimensions, StyleSheet, Image, Route} from 'react-native';
import {Colors} from '../constants/Colors';
import { Text, View } from '../components/Themed';
import FaceBox from '../components/FaceBox';
import {BoundaryBox} from "../constants/Face";
import {Navigation} from "../constants/typesUtil";
import * as FS from 'expo-file-system';
import {renderFaces} from "../firebase/init";

type Props = {
  route: Route;
  navigation: Navigation;
}

export default function SelectFaceScreen({route, navigation}: Props) {
  const [image, setImage] = useState(route.params.image);
  const [faces, setFaces] = useState<BoundaryBox[]>([]);
  const [imageHeight, setImageHeight] = useState<number>(0);

  useEffect(() => {
    setFaces([{isBackground: true, height: 100, width: 100, top: 50, left: 50} as BoundaryBox,
      {isBackground: false, height: 100, width: 100, top: 100, left: 200} as BoundaryBox,]);
    //renderFaces("female", "young", "dark");

    const dimensions = Dimensions.get('window');
    setImageHeight(Math.round(dimensions.width / image.width * image.height));
  }, [image]);


  return !!image && (
    <View style={styles.container}>
      <Text style={styles.text}>Select faces to replace</Text>
      <Image source={{uri: image.uri}} style={styles.image}/>
      <View style={[styles.boxContainer, {height: imageHeight}]}>
      {(faces.length > 0) && faces.map((face, index) => (
        <FaceBox key={index} face={face}/>
      ))}
      </View>
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
