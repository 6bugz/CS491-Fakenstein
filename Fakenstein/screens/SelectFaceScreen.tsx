import { RootTabScreenProps } from '../types';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';

import Svg, {
  Circle,
  Rect
} from 'react-native-svg';


export default function SelectFaceScreen({route, navigation}) {
    const [image, setImage] = useState(null);

    useEffect(() => {
      console.log(route);
      const {image} = route.params;
      setImage(image);
    }, []);

    return (
    <View style={styles.container}>
      {!!image &&
        <Svg height="50%" width="50%" viewBox="0 0 100 100">
          <Image source={{ uri: image.uri }} style={{ height: '90%', width: '90%'}}/>
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="blue"
            strokeWidth="2.5"
            fill="green"
          />
          <Rect
            x="15"
            y="15"
            width="70"
            height="70"
            stroke="red"
            strokeWidth="2"
            fill="yellow"
          />
        </Svg>}
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
