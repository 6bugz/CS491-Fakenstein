import { RootTabScreenProps } from '../types';
import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors} from '../constants/Colors';
import { Text, View } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';

export default function GalleryScreen({ navigation }: RootTabScreenProps<'Gallery'>) {

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        // Result object is: {cancelled:, height:, type:, uri:, width: }
        let response = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          // aspect: [16, 9],
          quality: 1,
        });

        console.log('Gallery Response = ', response);

        if (response.cancelled) {
          console.log('User cancelled image picker');
        } else {
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          navigation.push('SelectFace', {
              image: response
          });
        }
    };

    const openCamera = async () => {
        // Permission to open camera requested if not already granted
        // Result object is: {cancelled:, height:, type:, uri:, width: }
        let response = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          // aspect: [16, 9],
          quality: 1,
        });

        console.log('Camera Response = ', response);

        if (response.cancelled) {
          console.log('User cancelled image picker');
        } else {
          navigation.push('SelectFace', {
              image: response
          });
        }
    };

    return (
    <View style={styles.container}>
        <TouchableOpacity onPress={pickImage} >
          <Text style={styles.galleryText}>
            Select From Gallery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera} >
          <Text style={styles.galleryText}>
            Open Camera
          </Text>
        </TouchableOpacity>
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
