import { RootTabScreenProps } from '../types';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';

export default function SelectFaceScreen(
    { navigation }: RootTabScreenProps<'SelectFace'>) {

    return (
    <View style={styles.container}>
      <Text style={styles.galleryText}>
        SelectFace
      </Text>
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
  galleryText: {
      fontSize: 24,
      textAlign: 'center',
      color: Colors.dark.text,
    },
});
