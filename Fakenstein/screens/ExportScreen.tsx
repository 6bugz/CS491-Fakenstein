import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Platform, Route, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import { View } from '../components/Themed';
import {ImageType} from "../constants/utils";
import * as MediaLibrary from 'expo-media-library';
import BottomToolBox from "../components/BottomToolBox";
import MessagePopup from "../components/MessagePopup";
import * as FileSystem from 'expo-file-system';
import RNFS from 'react-native-fs';

type Props = {
  route: Route;
}

export default function ExportScreen({route}: Props) {
  const image: ImageType = (route.params.image);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    console.log("Export");
  }, []);


  const download = async () => {
    // direct to welcome page after informing the user
    const base64Code = image.uri.split(",")[1];

    if (Platform.OS === 'web'){
      var path = RNFS.DocumentDirectoryPath + '/test.png';
      RNFS.writeFile(path, base64Code, 'base64')
          .then((success) => {
            console.log('FILE WRITTEN!');
          })
          .catch((err) => {
            console.log(err.message);
          });

      RNFS.downloadFile({
        fromUrl: path,
        toFile: `${RNFS.DocumentDirectoryPath}/react-native.png`,
      }).promise.then((r) => {
        console.log('FILE DOWNLOADED');
      });
    }
    else {
      const filename = FileSystem.documentDirectory + "some_unique_file_name.png";
      await FileSystem.writeAsStringAsync(filename, base64Code, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await MediaLibrary.saveToLibraryAsync(filename)
          .then((res) => setVisible(true))
          .catch((err) => console.log(err.message));
    }

  }

  return  (
    !!image && (
      <View style={styles.container}>
        <MessagePopup visible={visible} setVisible={setVisible}
                      success={true}
                      message={"Image saved to gallery."} />
        <Image source={{uri: image.uri}} style={styles.image}/>
        <BottomToolBox undoF={null} undoT={""} nextF={download} nextT={"Download Image"}/>
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
    width: Dimensions.get('window').width,
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
