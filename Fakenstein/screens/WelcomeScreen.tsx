import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {Colors} from '../constants/Colors';
import {backendURL, dWidth} from "../constants/utils";
import * as ImagePicker from "expo-image-picker";
import {ImageInfo} from "expo-image-picker";


export default function WelcomeScreen({ navigation }: RootTabScreenProps<'Fakenstein'>) {

  const handleGoToAbout = () => {
    navigation.push('NotFound');
  }

  const toServer = async (image: ImageInfo) => {
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
      // await toServer(response);
      navigation.push('SelectFace', {
        image: response,
        boxes: [{"age": false,"gender": false,"height": 222,"invalid": false,
          "isBackground": true,"left": 268,"skinColor": false,"top": 209,"width": 152,
        }, {"age": false,"gender": false,"height": 222,"invalid": false,"isBackground": true,
          "left": 478,"skinColor": false,"top": 209,"width": 152,
        }],
      });
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
      <Text style={styles.title}>FAKENSTEIN</Text>
      <View style={styles.infoContainer}>
        <Image style={styles.logo} source={require('../assets/images/logo.png')} />
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.infoText}>
            OPEN GALLERY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera} style={styles.button}>
          <Text style={styles.infoText}>
            OPEN CAMERA
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoToAbout} style={styles.button}>
          <Text style={styles.infoText}>
            ABOUT US
          </Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  infoContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    backgroundColor: Colors.dark.background,
  },
  infoText: {
    fontSize: 20,
    paddingVertical: 8,
    textAlign: 'center',
    color: Colors.dark.text,
  },
  logo: {
    alignItems: 'center',
    width: 400,
    height: 400,
  },
  button: {
    width: dWidth * .5,
    backgroundColor:'#5F6361',
    borderRadius: 20,
    alignItems: "center",
    margin: 20,
  },
});
