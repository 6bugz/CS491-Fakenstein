import React, {useEffect, useState} from 'react';
import {Dimensions, Image,  Route, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import { View } from '../components/Themed';
import {dWidth, ImageType, isWeb} from "../constants/utils";
import * as MediaLibrary from 'expo-media-library';
import BottomToolBox from "../components/BottomToolBox";
import MessagePopup from "../components/MessagePopup";
import * as FileSystem from 'expo-file-system';

type Props = {
  route: Route;
}

export default function ExportScreen({route}: Props) {
  const image: ImageType = (route.params.image);
  const [visible, setVisible] = React.useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    console.log("Export");
  }, []);


  const downloadAndroid = async () => {
    console.log("DOWNLOAD");
    if(status !== 'granted')
      await requestPermission();
    // direct to welcome page after informing the user
    const base64Code = image.uri.split("data:image/png;base64,")[1];

    const filename = FileSystem.documentDirectory + "some_unique_file_name.png";
    await FileSystem.writeAsStringAsync(filename, base64Code, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await MediaLibrary.saveToLibraryAsync(filename)
      .then((res) => setVisible(true))
      .catch((err) => console.log(err.message));
  }

  const downloadWeb = async () => {
    console.log("DOWNLOAD");
  }

  return  (
    !!image && (
      <View style={styles.container}>
        <MessagePopup visible={visible} setVisible={setVisible}
                      success={true}
                      message={"Image saved to gallery."} />
        <Image source={{uri: image.uri}} style={styles.image}/>
        <BottomToolBox undoF={null} undoT={""} nextF={isWeb ? downloadWeb : downloadAndroid} nextT={"Download Image"}/>
      </View>
    )
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
  },
  image: {
    flex: 1,
    width: dWidth,
    height: undefined,
    resizeMode: 'contain',
  },
  boxContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  text: {
    color: Colors.dark.text,
    fontSize: 20,
    fontWeight: '600',
  },
});
