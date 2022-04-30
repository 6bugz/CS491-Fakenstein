import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {Colors} from '../constants/Colors';


export default function WelcomeScreen({ navigation }: RootTabScreenProps<'Fakenstein'>) {
  const handleGoToGallery = () => {
    navigation.push('Gallery');
  }

  const handleGoToAbout = () => {
    getJsonData();
    navigation.push('NotFound');
  }

  const getJsonData = () => {
    fetch('https://www.boredapi.com/api/activity',
        {method: 'GET'}).then((response) =>
        response.json()).then((responseJson) => {
      console.log(responseJson);
    }).catch((error) => console.log(error.message));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAKENSTEIN</Text>
      <View style={styles.infoContainer}>
          <Image style={styles.logo} source={require('../assets/images/logo.png')} />
          <TouchableOpacity onPress={handleGoToGallery} style={styles.galleryText}>
            <Text style={styles.infoText}>
              START FAKE-ING!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoToAbout} style={styles.infoText}>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  infoContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    backgroundColor: Colors.dark.background,
  },
  galleryText: {
    paddingBottom: 16,
    fontSize: 24,
    textAlign: 'center',
    color: Colors.dark.text,
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
});
