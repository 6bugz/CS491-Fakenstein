import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { Text, View } from '../components/Themed';


export default function FaceBox({face}) {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
      setSelected(face.isBackground);
    }, []);

    const selectBox = () => {
        setSelected(!selected);
    };

    return (<TouchableOpacity onPress={selectBox} style={
      [
        selected ? styles.boxBackground : styles.boxForeground,
        {
          height: face.height,
          width: face.width,
          top: face.top,
          left: face.left,
        }]}
      />);
}

const styles = StyleSheet.create({
  boxForeground: {
    position: 'absolute',
    borderColor: 'green',
    backgroundColor: 'green',
    borderWidth: 2,
    borderRadius: 4,
    opacity: 0.3,
  },
  boxBackground: {
    position: 'absolute',
    borderColor: 'yellow',
    backgroundColor: 'yellow',
    borderWidth: 2,
    borderRadius: 4,
    opacity: 0.5,
  },
});
