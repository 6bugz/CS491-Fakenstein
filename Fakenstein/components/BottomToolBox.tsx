import {Text, View} from "./Themed";
import {Pressable, StyleSheet} from "react-native";
import React from "react";
import {Colors} from "../constants/Colors";

type Props = {
  right: any;
  middle: any;
  next: any;
}
export default function BottomToolBox({right, middle, next}: Props) {
  return (
    <View style={styles.toolboxContainer}>
      <View style={styles.toolboxBar}>
        <Pressable onPress={() => console.log("Pressed")} style={styles.behave}
                   android_ripple={{borderless:true, radius: 50}}>
          <Text style={styles.text}>Undo</Text>
        </Pressable>
        <Pressable onPress={() => console.log("Pressed")} style={styles.behave}
                   android_ripple={{borderless:true, radius: 50}}>
          <Text style={styles.text}>Edit</Text>
        </Pressable>
        <Pressable onPress={() => next()} style={styles.behave}
                   android_ripple={{borderless:true, radius: 50}}>
          <Text style={styles.text}>Next</Text>
        </Pressable>
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