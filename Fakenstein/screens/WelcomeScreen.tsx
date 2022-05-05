import {StyleSheet, TouchableOpacity, Image, Platform} from 'react-native';
import React, {useState} from 'react';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {Colors} from '../constants/Colors';
import {backendURL, dWidth} from "../constants/utils";
import * as ImagePicker from "expo-image-picker";
import {ImageInfo} from "expo-image-picker";
import LoadingScreen from "./LoadingScreen";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import MessagePopup from "../components/MessagePopup";


export default function WelcomeScreen({ navigation }: RootTabScreenProps<'Fakenstein'>) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

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
        if(responseJson["message"] == 'successful') {
          setLoading(false);
          navigation.push('SelectFace', {
            image: image,
            boxes: responseJson['boxes'],
          });
        }
        else {
          setVisible(true);
          setMessage('We could not find any face in this picture.');
        }
      }).catch((error) => {
          console.log(error.message);
          setVisible(true);
          setMessage('We are having problems connecting to our server. Please try again later.');
        });
    setLoading(false);
  }

  const toWebServer = async (image: ImageInfo) => {

    const base64 = image.uri.split(",")[1];
    const data = {"image": base64};

    await fetch(backendURL + '/detect_web' , {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if(responseJson["message"] == 'successful') {
            setLoading(false);
            navigation.push('SelectFace', {
              image: image,
              boxes: responseJson['boxes'],
            });
          }
          else {
            setVisible(true);
            setMessage('We could not find any face in this picture.');
          }
        }).catch((error) => {
          console.log(error.message);
          setVisible(true);
          setMessage('We are having problems connecting to our server. Please try again later.');
        });
    setLoading(false);
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
      setLoading(true);
      await (Platform.OS === 'web') ? toWebServer(response) : toServer(response);
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
      setLoading(true);
      await toServer(response);
    }
  };

  return loading ? <LoadingScreen/>
    : (
    <View style={styles.container}>
      <MessagePopup visible={visible} setVisible={setVisible}
                    success={false}
                    message={message} />
      <Image style={styles.logoImage} source={require('../assets/images/LOGO-NAME.png')} />
      <Image style={styles.logo} source={require('../assets/images/logo.png')} />
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Entypo name="images" size={24} color={Colors.dark.text} />
        <Text style={styles.infoText}>
          GALLERY
        </Text>
      </TouchableOpacity>
      {(Platform.OS === 'android') &&
        <TouchableOpacity onPress={openCamera} style={styles.button}>
          <FontAwesome5 name="camera" size={24} color={Colors.dark.text}/>
          <Text style={styles.infoText}>
            CAMERA
          </Text>
        </TouchableOpacity>
      }
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
  infoText: {
    fontSize: 20,
    padding: 8,
    textAlign: 'center',
    color: Colors.dark.text,
  },
  logo: {
    width: 900,
    height: 300,
    marginBottom: 20,
  },
  logoImage: {
    width: 350,
    height: 100,
  },
  button: {
    width: dWidth * .5,
    backgroundColor:'#5F6361',
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
});

/*navigation.push('SelectFace', {
          image: response,
          boxes: [{"age": false,"gender": false,"height": 222,"invalid": false,
            "isBackground": true,"left": 268,"skinColor": false,"top": 209,"width": 152,
          }, {"age": false,"gender": false,"height": 222,"invalid": false,"isBackground": true,
            "left": 478,"skinColor": false,"top": 209,"width": 152,
          }],
        });*/