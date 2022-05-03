import {Text, View} from "./Themed";
import {Pressable, StyleSheet} from "react-native";
import React from "react";
import {Colors} from "../constants/Colors";

type Props = {
  undo: any;
  next: any;
}
export default function BottomToolBox({undo, next}: Props) {
  return (
    <View style={styles.toolboxContainer}>
      <View style={styles.toolboxBar}>
        {!!undo && <Pressable onPress={() => undo()} style={styles.behave}
                    android_ripple={{borderless: true, radius: 50}}>
          <Text style={styles.text}>Undo</Text>
        </Pressable>}
        {!!next && <Pressable onPress={() => next()} style={styles.behave}
                    android_ripple={{borderless: true, radius: 50}}>
          <Text style={styles.text}>Next</Text>
        </Pressable>}
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
    bottom: 20,
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
  },
});