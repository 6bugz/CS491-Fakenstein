
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';

export default function TabTwoScreen() {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
          setImage(result.uri);
        }
    };

    return (
    <View style={styles.container}>
        <TouchableOpacity onPress={pickImage} style={styles.helpLink}>
          <Text style={styles.galleryText}>
            Go To Gallery
          </Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.original.background,
  },
  title: {
    fontSize: 24,
     color: Colors.dark.text,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  helpLink: {
      paddingVertical: 8,
    },
    galleryText: {
      fontSize: 24,
      textAlign: 'center',
      color: Colors.original.text,
    },
});
