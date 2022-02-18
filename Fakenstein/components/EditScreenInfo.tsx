import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import logo from '../assets/images/logo.png'


export default function EditScreenInfo({ path }: { path: string }) {
console.log(logo);
  return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} alt="Logo" />

        <TouchableOpacity onPress={handleGoToGallery} style={styles.helpLink}>
          <Text style={styles.infoText}>
            About Us
          </Text>
        </TouchableOpacity>
      </View>
  );
}

function handleGoToGallery() {
  //navigation.push2('Gallery');
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 50,
    backgroundColor: Colors.original,
  },
  helpLink: {
    paddingVertical: 8,
  },
  galleryText: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.original.text,
  },
  infoText: {
      fontSize: 20,
      textAlign: 'center',
      color: Colors.dark.text,
    },
  logo: {
    alignItems: 'center',
    width: 400,
    height: 400,
  },
});
