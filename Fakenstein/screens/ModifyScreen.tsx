import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Route, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import { View } from '../components/Themed';
import {dWidth, ImageType, Navigation} from "../constants/utils";
import BottomToolBox from "../components/BottomToolBox";
import PopupBox from "../components/PopupBox";
import {BoundaryBox} from "../constants/Face";
import EditPopup from "../components/EditPopup";

type Props = {
  route: Route;
  navigation: Navigation;
}

export default function ModifyScreen({route, navigation}: Props) {
  const image: ImageType = route.params.image;
  const imageHeight = Math.round(dWidth / image.width * image.height);
  let popupRef = React.createRef();

  const [boxes, setBoxes] = useState<BoundaryBox[]>(route.params.boxes);

  useEffect(() => {
    console.log("Modify");
    console.log(boxes);
  }, []);

  const handlePushToExport = () => {
    navigation.push('Export', {
      image: image
    });
  }

  const show = (ind) => {
    console.log("MODIFY SHOW");
    popupRef.show(boxes[ind]);
  }

  const undo = () => {
    popupRef.show();
  }

  const closePopup = () => {
    popupRef.close();
  }


  return  (
    !!image && (
      <View style={styles.container}>
        <Image source={{uri: image.uri}} style={styles.image}/>
        <View style={[styles.boxContainer, {height: imageHeight}]}>
          {(boxes.length > 0) && boxes.map((face, index) => (
            <PopupBox key={index} inx={index} face={face} handler={show}/>
          ))}
        </View>
        <BottomToolBox undo={undo} next={handlePushToExport}/>
        <EditPopup ref={(target) => popupRef = target}
                   onTouchOutside={closePopup}/>
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
