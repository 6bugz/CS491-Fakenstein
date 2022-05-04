import React, {useEffect, useState} from 'react';
import {Image, Platform, Route, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import { View } from '../components/Themed';
import {backendURL, dWidth, ImageType, maximizeBox, Navigation} from "../constants/utils";
import BottomToolBox from "../components/BottomToolBox";
import {BoundaryBox} from "../constants/Face";
import PopupBox from "../components/PopupBox";
import EditPopup from "../components/EditPopup";
import LoadingScreen from "./LoadingScreen";

type Props = {
  route: Route;
  navigation: Navigation;
}

export default function ModifyScreen({route, navigation}: Props) {
  const [image, setImage] = useState<ImageType>(route.params.image);
  const [boxes, setBoxes] = useState<BoundaryBox[]>(route.params.boxes);
  const [index, setIndex] = useState(0);

  const [imageStack, setImageStack] = useState<ImageType[]>([image]);
  const [boxStack, setBoxStack] = useState<BoundaryBox[][]>([boxes]);

  const [loading, setLoading] = useState(false);

  let popupRef = React.createRef();
  const imageHeight = Math.round(dWidth / image.width * image.height);


  useEffect(() => {
    console.log("Modify");
    console.log(boxes);
  }, []);

  const handlePushToExport = () => {
    navigation.push('Export', {
      image: image
    });
  }

  const showPopup = (ind) => {
    setIndex(ind);
    console.log("MODIFY SHOW");
    popupRef.show(boxes[ind]);
  }

  const undo = () => {
    console.log("UNDO ");
    if(boxStack.length > 1) {
      if(Platform.OS === 'android') {
        imageStack.pop();
        setImage(imageStack[imageStack.length - 1]);
      }
      boxStack.pop();
      setBoxes(boxStack[boxStack.length - 1]);
    }
  }

  const closePopup = () => {
    popupRef.close();
  }

  const update = async (box: BoundaryBox, route: string) => {
    console.log(route + " request.");
    if(route == 'blend')
      setLoading(true);

    const newBoxes = JSON.parse(JSON.stringify(boxes));
    newBoxes[index] = box;
    setBoxStack([... boxStack, newBoxes]);
    setBoxes(newBoxes);
    if(Platform.OS === 'android') {
      const data = new FormData();
      // @ts-ignore
      data.append("image", image.uri.slice(22));
      data.append("faces", JSON.stringify(maximizeBox(imageHeight, image, box)));

      await fetch(backendURL + '/' + route, {
        method: 'POST',
        headers: { "Content-Type": "multipart/form-data" },
        body: data,
      }).then((response) => response.json())
          .then( (responseJson) => {
            const blendedImage = JSON.parse(JSON.stringify(image));
            blendedImage.uri = "data:image/png;base64," + responseJson["image"];
            setImage(blendedImage);
            setImageStack([... imageStack, blendedImage]);
          }).catch((error) => console.log(error.message));
    }
    setLoading(false);
  }


  return  loading ? <LoadingScreen/> : (
    !!image && (
      <View style={styles.container}>
        <Image source={{uri: image.uri}} style={styles.image}/>
        <View style={[styles.boxContainer, {height: imageHeight}]}>
          {(boxes.length > 0) && boxes.map((face, index) => (
            <PopupBox key={index} inx={index} face={face} open={showPopup}/>
          ))}
        </View>
        <BottomToolBox undoF={undo} undoT={"Undo"} nextF={handlePushToExport} nextT={"Done"}/>
        <EditPopup ref={(target) => popupRef = target}
                   onTouchOutside={closePopup} update={update}/>
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
    width: dWidth,
  },
  text: {
    color: Colors.dark.text,
    fontSize: 20,
    fontWeight: '600',
  },
});
