import { RootTabScreenProps } from '../types';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';


export default function SelectFaceScreen({route, navigation}) {
    const [image, setImage] = useState(null);

    useEffect(() => {
      console.log(route);
      const {image} = route.params;
      setImage(image);
    }, []);

    return (
    <View style={styles.container}>
      {!!image && <Image source={{ uri: image.uri }} style={{ height: '90%', width: '90%'}} />}
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
