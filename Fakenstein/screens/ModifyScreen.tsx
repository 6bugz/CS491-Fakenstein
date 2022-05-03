import React, {useEffect, useState} from 'react';
import {Image, Route, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import { View } from '../components/Themed';
import {dWidth, ImageType, Navigation} from "../constants/utils";
import BottomToolBox from "../components/BottomToolBox";
import {BoundaryBox} from "../constants/Face";
import PopupBox from "../components/PopupBox";
import EditPopup from "../components/EditPopup";

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
      //imageStack.pop();
      boxStack.pop();
      //setImage(imageStack[imageStack.length - 1]);
      setBoxes(boxStack[boxStack.length - 1]);
    }
  }

  const closePopup = () => {
    popupRef.close();
  }

  const update = (box: BoundaryBox) => {
    console.log("Blend request.");
    const newBoxes = JSON.parse(JSON.stringify(boxes));
    newBoxes[index] = box;
    setBoxStack([... boxStack, newBoxes]);
    setBoxes(newBoxes);
    /*
    const data=new FormData();
    // @ts-ignore
    data.append("image",{uri: image.uri, name: 'image.jpg', type: 'image/jpeg'})
    data.append("face", JSON.stringify(box));
    console.log(data)

    await fetch(backendURL + '/blend', {
      method: 'POST',
      headers: { "Content-Type": "multipart/form-data" },
      body: data,
    }).then((response) => response.json())
      .then( (responseJson) => {
        const blendedImage = JSON.parse(JSON.stringify(image));;
        blendedImage.uri = "data:image/png;base64," + responseJson["image"];
        setImage(blendedImage);
        setImageStack([... imageStack, blendedImage]);
      }).catch((error) => console.log(error.message));
     */
  }

  return  (
    !!image && (
      <View style={styles.container}>
        <Image source={{uri: image.uri}} style={styles.image}/>
        <View style={[styles.boxContainer, {height: imageHeight}]}>
          {(boxes.length > 0) && boxes.map((face, index) => (
            <PopupBox key={index} inx={index} face={face} open={showPopup}/>
          ))}
        </View>
        <BottomToolBox undo={undo} next={handlePushToExport}/>
        <EditPopup ref={(target) => popupRef = target}
                   onTouchOutside={closePopup} handler={update}/>
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
