import { RootTabScreenProps } from '../types';
import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../constants/Colors';
import { Text, View } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';
import {backendURL, toDetect} from "../constants/utils";

export default function GalleryScreen({ navigation }: RootTabScreenProps<'Gallery'>) {

  const toServer = async (image) => {
    const data=new FormData();
    // @ts-ignore
    data.append("image", {uri: image.uri, name: 'image.jpg', type: 'image/jpeg'})

    await fetch(backendURL + '/detect', {
      method: 'POST',
      headers: { "Content-Type": "multipart/form-data" },
      body: data,
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);

        navigation.push('SelectFace', {
          image: image,
          boxes: responseJson,
        });
      }).catch((error) => console.log(error.message));
  }

  const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      // Result object is: {cancelled:, height:, type:, uri:, width: }
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      console.log('Gallery Response = ', response);

      if (response.cancelled) {
        console.log('User cancelled image picker');
      } else {
        await toServer(response);
      }
  };

  const openCamera = async () => {
      // Permission to open camera requested if not already granted
      // Result object is: {cancelled:, height:, type:, uri:, width: }
      let response = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      console.log('Camera Response = ', response);

      if (response.cancelled) {
        console.log('User cancelled image picker');
      } else {
        await toServer(response);
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
