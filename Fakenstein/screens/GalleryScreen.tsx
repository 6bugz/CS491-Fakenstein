import { RootTabScreenProps } from '../types';
import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';

export default function GalleryScreen({ navigation }: RootTabScreenProps<'Gallery'>) {

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        // Result object is: {cancelled:, height:, type:, uri:, width: }
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          // aspect: [16, 9],
          quality: 1,
        });

        console.log(result);
        // get image ratio for the app

        if (!result.cancelled) {
          navigation.push('SelectFace', {
                      image: result
          });
        }
    };

    return (
    <View style={styles.container}>
        <TouchableOpacity onPress={pickImage} >
          <Text style={styles.galleryText}>
            Go To Gallery
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
