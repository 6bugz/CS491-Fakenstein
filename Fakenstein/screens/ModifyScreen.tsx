import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Pressable, Route, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import { Text, View } from '../components/Themed';
import {ImageType, Navigation} from "../constants/typesUtil";
import FaceBox from "../components/FaceBox";
import BottomToolBox from "../components/BottomToolBox";
import PopupBox from "../components/PopupBox";
import {BoundaryBox} from "../constants/Face";

type Props = {
  route: Route;
  navigation: Navigation;
}

export default function ModifyScreen({route, navigation}: Props) {
  const image: ImageType = (route.params.image);
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


  return  (
    !!image && (
      <View style={styles.container}>
        <Text style={styles.text}>Select faces to modify</Text>
        <Image source={{uri: image.uri}} style={styles.image}/>
        <View style={styles.boxContainer}>
          {(boxes.length > 0) && boxes.map((face, index) => (
            <PopupBox key={index} inx={index} face={face} handler={null}/>
          ))}
        </View>
        <BottomToolBox right={null} middle={null} next={null}/>
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
