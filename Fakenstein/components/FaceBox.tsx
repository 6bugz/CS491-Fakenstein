import React, { useState, useEffect } from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BoundaryBox} from "../constants/Face";
import {Text} from "./Themed";

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
        selected ? styles.boxBackground : styles.boxForeground,
        {
          height: face.height,
          width: face.width,
          top: face.top,
          left: face.left,
        }]}
      >
      <Text adjustsFontSizeToFit={true} numberOfLines={1} >{selected ? "Background" : "Foreground"}</Text>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 4,
    opacity: 0.3,
    alignItems: "flex-start",
  },
  boxForeground: {
    borderColor: 'green',
    backgroundColor: 'green',
  },
  boxBackground: {
    borderColor: 'yellow',
    backgroundColor: 'yellow',
    opacity: 0.5,
  },
  boxSelected: {
    borderColor: 'blue',
    backgroundColor: 'blue',
    opacity: 0.5,
  },
});
