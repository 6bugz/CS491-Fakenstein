import React, { useState, useEffect } from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BoundaryBox} from "../constants/Face";

type Props = {
  inx: number;
  face: BoundaryBox;
  handler: any;
}

export default function PopupBox({inx, face, handler}: Props) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    console.log(face)
    setSelected(face.isBackground);
  }, []);

  const selectBox = () => {
    setSelected(!selected);
    handler(inx, !face.isBackground);
  };

  return (<TouchableOpacity onPress={selectBox} style={
    [
      styles.box,
      selected ? styles.boxSelected : styles.boxBackground,
      {
        height: face.height,
        width: face.width,
        top: face.top,
        left: face.left,
      }]}
  />);
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 4,
    opacity: 0.3,
  },
  boxBackground: {
    borderColor: 'yellow',
    opacity: 0.5,
  },
  boxSelected: {
    borderColor: 'blue',
    backgroundColor: 'blue',
    opacity: 0.5,
  },
});
