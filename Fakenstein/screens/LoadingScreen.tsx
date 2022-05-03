import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import {Colors} from "../constants/Colors";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/images/logo.png')} />
      <Text style={styles.title}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.background,
  },
  logo: {
    width: 400,
    height: 400,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
});