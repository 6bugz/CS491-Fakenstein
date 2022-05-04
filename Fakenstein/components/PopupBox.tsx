import React, { useState } from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BoundaryBox} from "../constants/Face";
import {Colors} from "../constants/Colors";

type Props = {
  inx: number;
  face: BoundaryBox;
  open: any;
}

export default function PopupBox({inx, face, open}: Props) {
  const [selected, setSelected] = useState(false);

  const openEdit = () => {
    setSelected(!selected);
    if(!selected) open(inx);
  };

  return (
    <TouchableOpacity
      onPress={openEdit}
      style=
        {
          [styles.box, selected ? styles.boxSelected : styles.boxBackground, {
            height: face.height,
            width: face.width,
            top: face.top,
            left: face.left,
          }]
        }
    />
  );
}

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    borderWidth: 2,
    borderRadius: 4,
    opacity: 0.3,
  },
  boxBackground: {
    borderColor: Colors["dark"].pinkishWhite,
    opacity: 0.5,
  },
  boxSelected: {
    borderColor: Colors["dark"].button,
    backgroundColor: Colors["dark"].button,
    opacity: 0.5,
  },
});