import { RootTabScreenProps } from '../types';
import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';

export default function GalleryScreen({ navigation }: RootTabScreenProps<'Gallery'>) {
    const [image, setImage] = useState(null);

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
        // get ratio for the app

        if (!result.cancelled) {
          setImage(result.uri);
        }
        navigation.push('SelectFace', {
            navigation: navigation
        });

    };

    return (
    <View style={styles.container}>
        <TouchableOpacity onPress={pickImage} >
          <Text style={styles.galleryText}>
            Go To Gallery
          </Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={{ height: '90%', width: '90%'}} />}
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  galleryText: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.dark.text,
  },
});
