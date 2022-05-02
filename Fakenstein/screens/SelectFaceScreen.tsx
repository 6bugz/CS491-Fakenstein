import React, {useEffect, useState} from 'react';
import {Image, Route, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import {View} from '../components/Themed';
import FaceBox from '../components/FaceBox';
import {BoundaryBox} from "../constants/Face";
import {backendURL, dWidth, ImageType, Navigation, resizeBox, resizeBoxes} from "../constants/utils";
import BottomToolBox from "../components/BottomToolBox";


type Props = {
  route: Route;
  navigation: Navigation;
}

export default function SelectFaceScreen({route, navigation}: Props) {

  const image: ImageType = route.params.image;
  const imageHeight = Math.round(dWidth / image.width * image.height);

  const [boxes, setBoxes] = useState<BoundaryBox[]>([]);
  const [serverBoxes] = useState<BoundaryBox[]>(route.params.boxes);

  useEffect( () => {
    console.log(dWidth + ", " + imageHeight);
    console.log(image.width + ", " + image.height );
    setBoxes(resizeBoxes( imageHeight, image, serverBoxes));
  }, []);


  const setBackground = (index: number, val: boolean) => {
    boxes[index].isBackground = val;
    serverBoxes[index].isBackground = val;
    console.log(index + " " + val);
  }

  const goToModify = async () => {
    const data=new FormData();
    const faces = serverBoxes.map((face, index) =>
      (face.isBackground ? {[index]: face} : null)
    );
    // @ts-ignore
    data.append("image",{uri: image.uri, name: 'image.jpg', type: 'image/jpeg'})
    data.append("faces", JSON.stringify(faces));
    console.log(data)

    await fetch(backendURL + '/replace', {
      method: 'POST',
      headers: { "Content-Type": "multipart/form-data" },
      body: data,
    }).then((response) => response.json())
      .then( (responseJson) => {
        const responseFaces = responseJson["faces"];
        console.log(responseFaces);
        const modifyBoxes: BoundaryBox[] = [];
        let indx = 0;
        console.log(dWidth + ", " + imageHeight);
        console.log(image.width + ", " + image.height );
        for (let box in responseFaces) {
          if( responseFaces[box] ) {
            let obj = responseFaces[box];
            if(!obj[indx + ""].invalid){
              modifyBoxes.push(resizeBox( imageHeight, image, obj[indx + ""]));
            }
          }
          indx += 1;
        }
        console.log(modifyBoxes);
        const blendedImage = JSON.parse(JSON.stringify(image));;
        blendedImage.uri = "data:image/png;base64," + responseJson["image"];
        navigation.push('Modify', {
          image: blendedImage,
          boxes: modifyBoxes,
        });
      }).catch((error) => console.log(error.message));
  }

  const handleFakeNavigation = () => {
    navigation.push('Modify', {
      image: image,
      boxes: boxes,
    });
  }

  return !!image && (
    <View style={styles.container}>
      <Image source={{uri: image.uri}} style={styles.image}/>
      <View style={[styles.boxContainer, {height: imageHeight}]}>
        {(boxes.length > 0) && boxes.map((face, index) => (
            <FaceBox key={index} inx={index} face={face} handler={setBackground}/>
        ))}
      </View>
      <BottomToolBox undo={null}  next={handleFakeNavigation}/>
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
    width: dWidth,
    height: undefined,
    resizeMode: 'contain',
  },
  boxContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: dWidth,
  },
});
