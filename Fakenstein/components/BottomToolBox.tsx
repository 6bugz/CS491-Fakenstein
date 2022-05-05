import {Text, View} from "./Themed";
import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {Colors} from "../constants/Colors";

type Props = {
  undoF: any;
  nextF: any;
  undoT: string;
  nextT: string;
}
export default function BottomToolBox({undoF,undoT,nextF, nextT}: Props) {

  return (
    <View style={styles.toolboxContainer}>
      <View style={styles.toolboxBar}>
        {!!undoF && <TouchableOpacity onPress={() => undoF()} style={styles.behave}>
          <Text style={styles.text}>{undoT}</Text>
        </TouchableOpacity>}
        {!!nextF && <TouchableOpacity onPress={() => nextF()} style={styles.behave}>
          <Text style={styles.text}>{nextT}</Text>
        </TouchableOpacity>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.dark.text,
    fontSize: 20,
    fontWeight: '600',
  },
  toolboxContainer: {
    position: 'absolute',
    alignItems: "center",
    bottom: 40,
    backgroundColor: "transparent",
  },
  toolboxBar: {
    flexDirection: "row",
    backgroundColor: "gray",
    opacity: 0.8,
    width: "90%",
    justifyContent: "space-evenly",
    borderRadius: 40,
  },
  behave: {
    padding: 10,
    alignItems: "center",
    flex: 1,
  },
});