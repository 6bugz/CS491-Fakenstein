import { RootTabScreenProps } from '../types';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Colors, Box} from '../constants/Colors';
import { Text, View } from '../components/Themed';
import FaceBox from '../components/FaceBox';


export default function SelectFaceScreen({route, navigation}) {
    const [image, setImage] = useState(null);
    const [faces, setFaces] = useState([]);

    useEffect(() => {
      console.log(route);
      const {image} = route.params;
      setImage(image);
      setFaces([{isBackground: true, height: 200, width: 150, top: 100, left: 400},
        {isBackground: false, height: 250, width: 150, top: 300, left: 200},]);
    }, []);


    return (
    <View style={styles.container}>
      {!!image &&
        <Image source={{ uri: image.uri }} style={{ height: '90%', width: '90%'}}/>
      }
      {(faces.length > 0) && faces.map((face, index) => (
          <FaceBox key={index} face={face}/>
      ))}
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
});
