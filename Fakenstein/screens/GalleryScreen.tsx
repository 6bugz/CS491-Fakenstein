import { RootTabScreenProps } from '../types';
import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../constants/Colors';
import { Text, View } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';
import * as FS from "expo-file-system";

export default function GalleryScreen({ navigation }: RootTabScreenProps<'Gallery'>) {
  const [response, setResponse] = useState("");

  const toServer = async (mediaFile: { base64: string | undefined, uri: string; }) => {
    let schema = "http://";
    let host = "139.179.205.77";
    let port = "5000";
    let route = "/face";
    let content_type = "image/jpeg";
    const url = schema + host + ":" + port + route;

    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        "content-type": content_type,
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });

    setResponse(response.toString());
    return response;
  };

  const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      // Result object is: {cancelled:, height:, type:, uri:, width: }
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64: true,
        quality: 1,
      });

      console.log('Gallery Response = ', response);

      if (response.cancelled) {
        console.log('User cancelled image picker');
      } else {

        await toServer({
          base64: response.base64,
          uri: response.uri,
        }).then((r) => console.log(r))
            .catch((e) => console.log(e.message));

        //navigation.push('SelectFace', {
          //  image: response
        //});
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
    <Text style={styles.galleryText}>
      {response}
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
