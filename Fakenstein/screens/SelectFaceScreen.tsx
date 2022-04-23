import { RootTabScreenProps } from '../types';
import React, { useState, useEffect } from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Colors, Box} from '../constants/Colors';
import { Text, View } from '../components/Themed';
import FaceBox from '../components/FaceBox';


export default function SelectFaceScreen({route, navigation}) {
    const [image, setImage] = useState(null);
    const [faces, setFaces] = useState([]);
    const [imageHeight, setImageHeight] = useState(null);

    useEffect(() => {
      console.log(route);
      const {image} = route.params;
      setImage(image);
      setFaces([{isBackground: true, height: 100, width: 100, top: 50, left: 50},
        {isBackground: false, height: 100, width: 100, top: 100, left: 200},]);

      const dimensions = Dimensions.get('window');
      setImageHeight(Math.round(dimensions.width / image.width * image.height));
    }, [image]);


    return (
    <View style={styles.container}>
      {!!image &&
        <Image source={{ uri: image.uri }} style={styles.image} />
      }
      <View style={{position: 'absolute', backgroundColor: 'transparent', width: Dimensions.get('window').width, height: imageHeight}}>
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
});
