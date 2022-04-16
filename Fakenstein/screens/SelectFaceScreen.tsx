import { RootTabScreenProps } from '../types';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Box} from '../constants/Colors';
import { Text, View } from '../components/Themed';

import Svg, {
  SvgUri,
  Circle,
  Rect,
  Image,
} from 'react-native-svg';

export default function SelectFaceScreen({route, navigation}) {
    const [image, setImage] = useState(null);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
      console.log(route);
      const {image} = route.params;
      setImage(image);
    }, []);

    const selectBox = () => {
        setSelected(!selected);
    };

    return (
    <View style={styles.container}>
      {!!image &&
        <Svg height="100%" width="100%">
          <Image
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            href={image.uri}
          />
        </Svg>
      }
      <TouchableOpacity onPress={selectBox} style={{position: 'absolute'}}>
        <Svg height="100%" width="100%" position="absolute">
            <Rect x="400" y="400" width="50" height="50" fill={selected ? Box.selected : Box.transparent} stroke={Box.border}/>
        </Svg>
      </TouchableOpacity>
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

/*
<Image source={{ uri: image.uri }} style={{ height: '90%', width: '90%'}}/>
*/