import React, { useState, useEffect } from 'react';
import {Dimensions, StyleSheet, Image, Route, Pressable} from 'react-native';
import {Colors} from '../constants/Colors';
import {Text, View} from '../components/Themed';
import FaceBox from '../components/FaceBox';
import {BoundaryBox} from "../constants/Face";
import {backendURL, ImageType, Navigation} from "../constants/typesUtil";


type Props = {
  route: Route;
  navigation: Navigation;
}

export default function SelectFaceScreen({route, navigation}: Props) {
  const dWidth = Dimensions.get('window').width;
  const image: ImageType = (route.params.image);
  const imageHeight = Math.round(dWidth / image.width * image.height);

  const [boxes, setBoxes] = useState<BoundaryBox[]>([]);

  useEffect( () => {
    console.log(dWidth + ", " + imageHeight);
    console.log(image.width + ", " + image.height );
    resizeBoxes(route.params.boxes);
  }, []);

  const resizeBoxes = (boxes : BoundaryBox[]) => {
    let faceBoxes: BoundaryBox[] = [];
    for (let box of boxes) {
      const boundary = {
        isBackground: box.isBackground,
        height: box.height * imageHeight / image.height,
        width: box.width * dWidth / image.width,
        top: box.top * imageHeight / image.height,
        left: box.left * dWidth / image.width,
      };
      console.log(boundary)
      faceBoxes.push(boundary);
    }
    setBoxes(faceBoxes);
  }

  const setBackground = (index: number, val: boolean) => {
    const tmp = boxes;
    tmp[index].isBackground = val;
    setBoxes(tmp);
    console.log(index + " " + val);
  }

  const goToModify = () => {
    const data=new FormData();
    const faces = boxes.map((face, index) =>
      (face.isBackground ? {[index]: face} : null)
    );
    data.append("image", {uri: image.uri, name: 'image.jpg', type: 'image/jpeg'})
    data.append("faces", JSON.stringify(faces));
    console.log(data)

    fetch(backendURL + '/classify', {
      method: 'POST',
      headers: { "Content-Type": "multipart/form-data" },
      body: data,
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);

        navigation.push('Modify', {
          image: image,
          boxes: responseJson,
        });
      }).catch((error) => console.log(error.message));
  }

  return !!image && (
    <View style={styles.container}>
      <Image source={{uri: image.uri}} style={styles.image}/>
      <View style={[styles.boxContainer, {height: imageHeight}]}>
        {(boxes.length > 0) && boxes.map((face, index) => (
            <FaceBox key={index} inx={index} face={face} handler={setBackground}/>
        ))}
      </View>
      <View style={styles.toolboxContainer}>
        <View style={styles.toolboxBar}>
          <Pressable onPress={() => console.log("Pressed")} style={styles.behave}
                     android_ripple={{borderless:true, radius: 50}}>
            <Text style={styles.text}>Undo</Text>
          </Pressable>
          <Pressable onPress={() => console.log("Pressed")} style={styles.behave}
                     android_ripple={{borderless:true, radius: 50}}>
            <Text style={styles.text}>Edit</Text>
          </Pressable>
          <Pressable onPress={() => goToModify()} style={styles.behave}
                     android_ripple={{borderless:true, radius: 50}}>
            <Text style={styles.text}>Next</Text>
          </Pressable>
        </View>
      </View>
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
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: undefined,
    resizeMode: 'contain',
  },
  boxContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width,
  },
  text: {
    color: Colors.dark.text,
    fontSize: 20,
    fontWeight: '600',
  },
  toolboxContainer: {
    position: 'absolute',
    alignItems: "center",
    bottom: 20,
    backgroundColor: "transparent",
  },
  toolboxBar: {
    flexDirection: "row",
    backgroundColor: "gray",
    opacity: 0.8,
    width: "90%",
    justifyContent: "space-evenly",
    borderRadius: 40,
  },
  behave: {
    padding: 10,
  },
});
