import React, { useState, useEffect } from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BoundaryBox} from "../constants/Face";

type Props = {
  inx: number;
  face: BoundaryBox;
  handler: any;
}

export default function FaceBox({inx, face, handler}: Props) {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
      setSelected(face.isBackground);
    }, []);

    const selectBox = () => {
        setSelected(!selected);
        handler(inx, !face.isBackground);
    };

    return (<TouchableOpacity onPress={selectBox} style={
      [
        styles.box,
        selected && styles.boxBackground ,
        {
          height: face.height,
          width: face.width,
          top: face.top,
          left: face.left,
        }]}
      >
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    borderWidth: 4,
    borderRadius: 4,
    opacity: 0.3,
    borderColor: '#F92660',
  },
  boxBackground: {
    backgroundColor: '#F92660',
    opacity: 0.5,
  },
});
